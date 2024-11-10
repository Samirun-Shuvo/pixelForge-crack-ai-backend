const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const form = `<form method="POST" action="/prompt">
  <textarea name="prompt" id="prompt"></textarea>
  <button type="submit">Genarate</button>
</form>`;

app.use(express.urlencoded({ extended: true }));

app.get("/prompt", async (req, res) => {
  res.send(form);
});

app.post("/prompt", async (req, res) => {
  const { prompt } = req.body;
    const result = await generateContent(prompt);
    const text = await result.response.text();
  res.send({ data: JSON.stringify(text), status: 200 });
});

app.get("/", (req, res) => {
  res.send({ data: "server running", status: 200 });
});