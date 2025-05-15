const axios = require("axios");
const authmiddleware = require("../middleware/authMiddleware");
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  // if (!req.isAuthenticated()) return res.redirect("/auth/facebook/connect");
  try {
    const accessToken = req.user.accessToken;
    const response = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);
    res.json({ pages: response.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

const checkPageActivation = async (pageId) => {
  try {
    const data = await prisma.fbPage.findUnique({
      where: {
        PageId: pageId,
      },
    })

    if (!data) {
      return false
    } else {
      if (data.status === true) {
        return true
      }
      else {
        return false
      }
    }
  } catch (error) {
    console.log(error);
  }
}
exports.getPages = [authmiddleware, async (req, res) => {
  try {

    const accessToken = req.accessToken;

    const response = await axios.get(`https://graph.facebook.com/me/accounts?access_token=${accessToken}`);

    const pages = response.data.data;

    const pagesWithPic = await Promise.all(
      pages.map(async (page) => {
        const picRes = await axios.get(`https://graph.facebook.com/${page.id}/picture?redirect=false&access_token=${accessToken}`);
        const status = await checkPageActivation(page.id);
        return {
          id: page.id,
          name: page.name,
          category: page.category,
          picture: picRes.data.data.url,
          status: status
        }
      })
    )
    res.status(200).json(pagesWithPic);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
}];

exports.facebookProfile = [authmiddleware, async (req, res) => {

  try {
    const response = await axios.get(
      'https://graph.facebook.com/me',
      {
        params: {
          fields: 'id,name,email,first_name,last_name,gender,birthday,link,locale,location,picture',
          access_token: req.accessToken
        }
      }
    );
    const userData = response.data;
    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
}];

exports.createPost = async (req, res) => {


  const { pageId, imageUrl, caption, hashtags, accessToken } = req.body;

  try {
    const message = `${caption}\n\n${hashtags}`;
    const data = {
      url: imageUrl,
      caption: message,
      access_token: accessToken
    }
    console.log("data", data, pageId);

    const url = `https://graph.facebook.com/v18.0/${pageId}/photos`;

    const postResponse = await axios.post(url, data);

    res.json({ success: true, postId: postResponse.data.post_id });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};

exports.getPosts = async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });

  const accessToken = req.user.accessToken;
  const pageId = req.query.pageId;

  try {
    const response = await axios.get(`https://graph.facebook.com/${pageId}/posts?access_token=${accessToken}`);
    res.json({ posts: response.data.data });
  } catch (error) {
    res.status(500).json({ error: error.response?.data || error.message });
  }
};


exports.togglePageStatus = async (req, res) => {
  const { PageId, userId, name, category, picture } = req.body;

  if (!PageId || !userId) {
    return res.status(400).json({ message: "PageId and userId are required" });
  }

  try {
    let page = await prisma.fbPage.findUnique({
      where: { PageId }
    });

    if (!page) {
      // Find associated fbAuth for this user
      const fbAuth = await prisma.fbAuth.findFirst({
        where: { userId: parseInt(userId) }
      });

      if (!fbAuth || !fbAuth.AccessToken) {
        return res.status(404).json({ message: "Valid fbAuth not found for this user" });
      }

      // Fetch the list of pages using user's access token
      const response = await axios.get(`https://graph.facebook.com/v18.0/me/accounts`, {
        params: {
          access_token: fbAuth.AccessToken
        }
      });

      const matchedPage = response.data.data.find(pg => pg.id === PageId);

      if (!matchedPage) {
        return res.status(404).json({ message: "Page not found in user's managed pages" });
      }

      // Create the page in DB with access token
      page = await prisma.fbPage.create({
        data: {
          PageId,
          userId: parseInt(userId),
          authId: fbAuth.id,
          name: name || matchedPage.name || null,
          category: category || matchedPage.category || null,
          picture: picture || null,
          status: true,
          AccessToken: matchedPage.access_token
        },
      });

      return res.status(200).json({ message: "Page connected successfully", status: true });
    } else {
      // Toggle the page status
      const updatedPage = await prisma.fbPage.update({
        where: { PageId },
        data: {
          status: !page.status,
        }
      });

      const statusMsg = updatedPage.status ? "Page activated successfully" : "Page deactivated successfully";
      return res.status(200).json({ message: statusMsg, status: updatedPage.status });
    }

  } catch (error) {
    console.error("Error in togglePageStatus:", error?.response?.data || error);
    return res.status(500).json({ message: "Failed to toggle page status" });
  }
};

