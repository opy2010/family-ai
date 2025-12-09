export default async function handler(req, res) {
  const userMessage = req.body.message;

  try {
    const aiResponse = await fetch("https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/text-bison-001:predict", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,  // Google API Key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        instances: [
          { content: userMessage }
        ],
        parameters: { temperature: 0.7, maxOutputTokens: 500 }
      }),
    });

    const data = await aiResponse.json();
    const reply = data.predictions?.[0]?.content || "AI 没有返回内容";

    res.status(200).json({ reply });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "调用 AI 时出错" });
  }
}
