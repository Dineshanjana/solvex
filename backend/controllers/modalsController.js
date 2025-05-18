const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const IMAGE_API_KEY = process.env.IMAGE_API_KEY;
const IMAGE_API_URL = "https://modelslab.com/api/v6/realtime/text2img";


// Utility: Caption generator (shortened version)
async function generateCaption(reasoning) {
    const prompt = `Generate a short, professional social media caption (max 1200 characters) for this intent:
- Intent: ${reasoning.intent}
- Industry: ${reasoning.industry}
- Audience: ${reasoning.target_audience}
- Tone: ${reasoning.tone}
- Subject: ${reasoning.subject}
Make it engaging but short, ideally under 1200 characters.
Do not include hashtags or links in the caption. Just write the plain text.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text().trim();
}

// Utility: Hashtag generator (limit to top 5–8)
async function generateHashtags(reasoning) {
    const prompt = `Generate 5-8 popular and relevant hashtags for:
- Intent: ${reasoning.intent}
- Industry: ${reasoning.industry}
- Platform: ${reasoning.platform}
- Audience: ${reasoning.target_audience}

Return only hashtags, each on a new line.
Each hashtag should use CamelCase (capitalize the first letter of each word).,
Do not include any extra text or explanation.`;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const formattedText = result.response.text().trim();

    // Clean and limit hashtags
    const hashtags = formattedText
        .split('\n')
        .map(line => line.trim())
        .filter(tag => tag.startsWith('#'))
        .slice(0, 8); // Limit to 8

    return hashtags;
}

// Utility: Image generator
async function generateImage(prompt) {
    try {
        const response = await axios.post(IMAGE_API_URL, {
            key: IMAGE_API_KEY,
            prompt,
            negative_prompt: "",
            samples: "1",
            height: "1200",
            width: "1200",
            safety_checker: false,
            seed: null,
            base64: false
        });

        return response.data.output[0];

    } catch (error) {
        console.log('Fetching Error for img', error);

        return null;
    }
}

// Utility: Reasoning agent
async function analyzePrompt(prompt, platform) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const reasoningPrompt = `Analyze the following prompt and extract the following:
intent, subject, target_audience, tone, platform, industry.

Prompt:
"${prompt}"
Platform : "${platform}"

Return valid JSON like:
{
  "intent": "promote product",
  "subject": "new coffee blend", 
  "target_audience": "coffee lovers",
  "tone": "enthusiastic",
  "platform": "instagram",
  "industry": "food and beverage"
}`;

        const result = await model.generateContent(reasoningPrompt);
        const text = result.response.text();
        const jsonStr = text.replace(/```json\n|\n```/g, '').trim();

        try {
            return JSON.parse(jsonStr);
        } catch (err) {
            throw new Error('Failed to parse AI response into JSON');
        }
    } catch (err) {
        console.log(err);
    }
}

// Main Controller
const PostGen = async (req, res) => {
    const { prompt, platform } = req.body;


    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    try {
        const reasoning = await analyzePrompt(prompt, platform);

        const posts = await Promise.all([1, 2, 3].map(async () => {
            const [caption, hashtags, imagePath] = await Promise.all([
                generateCaption(reasoning),
                generateHashtags(reasoning),
                generateImage(`Social media banner for: ${reasoning.subject}, ${reasoning.intent}, tone: ${reasoning.tone}`)
            ]);

            return {
                image: imagePath,
                caption,
                hashtags
            };
        }));

        res.status(200).json({ posts });

    } catch (error) {
        console.error("Error generating post:", error);
        res.status(500).json({ error: error.message || "Failed to generate post" });
    }
};

module.exports = {
    PostGen
};