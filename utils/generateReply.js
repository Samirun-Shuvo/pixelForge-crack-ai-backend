const generateReply = async (message) => {
  const apiKey = process.env.OPENAI_API_KEY; // Get your API key from environment variables

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // Or use any other GPT model
        messages: [
          {
            role: "user",
            content: message, // Send the user's message to GPT
          },
        ],
        max_tokens: 150, // Control the length of the reply
      }),
    });

    const data = await response.json();

    if (data.choices && data.choices[0]) {
      return data.choices[0].message.content; // Return the AI's reply
    } else {
      throw new Error("Failed to get a valid response from OpenAI API");
    }
  } catch (error) {
    console.error("Error generating reply:", error);
    return "Sorry, something went wrong. Please try again later."; // Fallback response in case of error
  }
};

module.exports = generateReply;
