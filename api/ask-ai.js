export default async function handler(req, res) {
  const userMessage = req.body.message;

  try {
    const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,  // 这里就是你的 Google API Key
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",  // 或你想用的模型
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await aiResponse.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "AI 没有返回内容",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "调用 AI 时出错" });
  }
}
