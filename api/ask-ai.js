export default async function handler(req, res) {
  const userMessage = req.body.message;

  // 调用 AI API（这里以 OpenAI 接口格式为例）
  const aiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // 放在 Vercel 环境变量
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: userMessage }],
    }),
  }).then(r => r.json());

  res.status(200).json({
    reply: aiResponse.choices?.[0]?.message?.content || "AI 没有返回内容",
  });
}
