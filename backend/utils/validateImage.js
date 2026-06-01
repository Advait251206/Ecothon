const { GoogleGenAI } = require("@google/genai");

const API_KEY = process.env.GEMINI_API_KEY;
// Initialize with fault tolerance if key is missing
const ai = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

async function validateImage(mimeType, imageBase64) {
  if (!ai) {
      console.warn("Gemini API Key missing. Skipping validation.");
      return { valid: true, note: "Validation skipped (No API Key)" };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are an image validation system for an environmental monitoring application.

Your task is to decide whether an uploaded image is ACCEPTABLE for
Water Hyacinth (Eichhornia) analysis.

VALID image conditions (any ONE is sufficient):
1. Water hyacinth plants are clearly visible, even if no water body is visible.
2. A lake, pond, river, or wetland is visible AND water hyacinth is present on the water surface.

INVALID image conditions (any ONE is sufficient):
- No water hyacinth present.
- Indoor scenes (house, room, furniture).
- Urban scenes (roads, buildings, vehicles, people).
- Natural scenes without water hyacinth (plain lake, river, sky, trees, mountains).
- Unrelated objects or poor-quality images where hyacinth cannot be identified.

STRICT OUTPUT RULES:
- Respond ONLY in valid JSON.
- Respond with RAW JSON ONLY.
- Do NOT use Markdown.
- Do NOT wrap the response in \`\`\` or \`\`\`json.
- Do NOT include explanations outside JSON.
- Do NOT guess. If uncertain, mark as invalid.

Required strict JSON format:
{
  "valid": true | false
}

`
            },
            {
              inlineData: {
                mimeType: mimeType,
                data: imageBase64
              }
            }
          ]
        }
      ],
      config: {
        temperature: 0.1,
        maxOutputTokens: 300
      }
    });

    const text = response.candidates[0].content.parts[0].text;
    try {
      const jsonResponse = JSON.parse(text);
      return jsonResponse;
    } catch (error) {
      console.error("JSON Parse Error:", text);
      throw new Error("Failed to parse AI response as JSON");
    }
  } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
  }
}

module.exports = validateImage;
