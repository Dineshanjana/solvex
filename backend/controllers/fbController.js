const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

function stringifyBigInts(obj) {
    if (Array.isArray(obj)) {
        return obj.map(stringifyBigInts);
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj = {};
        for (const key in obj) {
            const value = obj[key];
            newObj[key] = typeof value === 'bigint' ? value.toString() : stringifyBigInts(value);
        }
        return newObj;
    }
    return obj;
}

const fetchActivePage = async (req, res) => {
    const platform = "FACEBOOK";

    try {
        const activePages = await prisma.fbPage.findMany({
            where: {
                status: true,
                fbAuth: {
                    platform: platform
                }
            },
            include: {
                fbAuth: true,
            }
        });

        const safeData = stringifyBigInts(activePages);

        res.status(200).json({
            message: "Active Facebook pages fetched successfully",
            data: safeData,
        });
    } catch (error) {
        console.error("Error in fetchActivePage:", error);
        res.status(500).json({ message: "Failed to fetch active Facebook pages" });
    }
};

module.exports = { fetchActivePage };
