import fetch from "node-fetch";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

export async function classifyTicketWithGemini(title, description) {
  try {
    const prompt = `
      You are an AI support ticket classifier.
      Return ONLY valid JSON. Do not add explanations.

      Ticket:
        Title: ${title}
        Description: ${description}

      Rules:
        - Choose the most accurate category
        - assignedQueue must reflect the internal team, not just repeat the category
        - priority depends on urgency, impact, and user frustration

        JSON format:
        {
          "category": "Billing Problem | Payments | Technical Issue | Account / Login | Sales Inquiry | Feature Request | Bug Report | General Question",
          "priority": "Low | Medium | High",
          "assignedQueue": "Finance Ops | Payment Support | Engineering Support | Account Services | Sales Ops | Product Team | QA / Bug Triage | Customer Care"
        }
    `;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Gemini API error ${response.status}: ${err}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start === -1 || end === -1) {
      throw new Error("Invalid JSON returned by Gemini");
    }

    return JSON.parse(text.slice(start, end + 1));
  }
  catch (error) {
    console.error("Ticket classification failed:", error);

    return {
      category: "General Question",
      priority: "Medium",
      assignedQueue: "Customer Care"
    };
  }
}



