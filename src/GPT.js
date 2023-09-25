import axios from "axios";

export const getGPT = async (user_input, messageParam, temperature, maxTokens, secretKey, memoryLength) => {
  try {
    const cutMessageParam = messageParam.slice(Math.max(messageParam.length - parseInt(memoryLength) * 2, 0))
    const inputMessageParam = [
      {
        role: "system",
        content: "You are a helpful assistant that will act as any role the user wishes.",
      },
      ...cutMessageParam,
      { role: "user", content: user_input },
    ];

    console.log("inputMessageParam", inputMessageParam);
    
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4",
        messages: inputMessageParam,
        temperature: parseFloat(temperature),
        max_tokens: parseInt(maxTokens),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    return response.data.choices[0].message.content;

  } catch (error) {
    console.error("Error:", error.message);
    return "oopsie there was an error, ask me about it - siming \n\n" + error.message;
  }
}