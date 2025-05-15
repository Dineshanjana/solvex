// authFacebookController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.facebookAuth = (req, res, next) => {
  next();
};

exports.logout = async (req, res) => {
  try {
    const fbId = req.query.id;
    const platform = req.query.platform || "X";

    if (!fbId || !platform) {
      return res.status(400).json({ message: "fbId and platform are required" });
    }

    // Convert fbId to BigInt for Prisma query
    const parsedFbId = BigInt(fbId);

    console.log("Logging out fbId:", parsedFbId, "Platform:", platform);

    // Fetch the record with both fbId and platform
    const fbAuth = await prisma.fbAuth.findFirst({
      where: {
        fbId: parsedFbId,
        platform: platform.toUpperCase() // If enum values are uppercase like 'FACEBOOK'
      }
    });

    console.log("Found fbAuth:", fbAuth);
    
    if (!fbAuth) {
      return res.status(404).json({ message: "Facebook account not found" });
    }

    if (!fbAuth.isConnected) {
      return res.status(400).json({ message: "Account already disconnected" });
    }

    // Update the record to disconnect
    await prisma.fbAuth.update({
      where: { id: fbAuth.id }, // Safer to use `id` since it's primary key
      data: {
        AccessToken: null,
        isConnected: false,
      }
    });

    // Optional session logout
    req.logout(function (err) {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Session logout failed" });
      }
      res.status(200).json({
        success: true,
        message: `Successfully disconnected ${platform} account`
      });
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message
    });
  }
};
