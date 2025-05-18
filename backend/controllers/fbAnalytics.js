const axios = require('axios');
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Function to fetch basic page insights
exports.fetchPageInsights = async (req, res) => {
  const PageId = "676379262217266"; // Replace with your page ID

  if (!PageId) {
    return res.status(400).json({ message: "PageId is required" });
  }

  try {
    // Get the page's access token from the database
    const page = await prisma.fbPage.findUnique({
      where: { PageId },
      select: { AccessToken: true }
    });

    if (!page || !page.AccessToken) {
      return res.status(404).json({ message: "Page access token not found" });
    }

    // Fetch basic page insights
    const response = await axios.get(`https://graph.facebook.com/v22.0/${PageId}/insights`, {
      params: {
        metric: " post_activity_by_action_type, post_clicks_by_type", // Add more metrics if needed
        access_token: page.AccessToken,
      }
    });

    if (response.data.error) {
      return res.status(500).json({ message: "Error fetching page insights", details: response.data.error });
    }

    // Return the analytics data
    return res.status(200).json({
      message: "Page insights fetched successfully",
      data: response.data
    });

  } catch (error) {
    console.error("Error in fetchPageInsights:", error);
    return res.status(500).json({ message: "Failed to fetch page insights" });
  }
};
