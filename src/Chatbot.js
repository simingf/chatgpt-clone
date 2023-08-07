import {
  Button,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import { MuiMarkdown } from "mui-markdown";
import React, { useEffect, useRef, useState } from "react";

const Chatbot = () => {
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState([]);
  const chatEndRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [secretKey, setSecretKey] = useState("");
  const [temperature, setTemperature] = useState("0.5");
  const [maxTokens, setMaxTokens] = useState("1000");
  const [memoryLength, setMemoryLength] = useState("10");

  useEffect(() => {
    chatEndRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = async (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setChat((prevChat) => [
        ...prevChat,
        { message: inputValue, isUser: true },
      ]);

      const user_input = inputValue;
      setInputValue("");

      const input_messages = [
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        ...messages,
        { role: "user", content: user_input },
      ];

      console.log("input_messages", input_messages);

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: input_messages,
            max_tokens: parseInt(maxTokens),
            temperature: parseFloat(temperature),
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${secretKey}`,
            },
          }
        );
        const chatbotResponse = response.data.choices[0].message.content;

        const subtract = parseInt(memoryLength) * 2 - 2;
        const newMessages = [
          ...messages.slice(Math.max(messages.length - subtract, 0)),
          { role: "user", content: user_input },
          { role: "assistant", content: chatbotResponse },
        ];

        setMessages(newMessages);
        console.log("messages", newMessages);

        setChat((prevChat) => [
          ...prevChat,
          { message: chatbotResponse, isUser: false },
        ]);
      } catch (error) {
        setChat((prevChat) => [
          ...prevChat,
          {
            message: "oopsie there was an error, ask me about it - siming",
            isUser: false,
          },
        ]);
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper style={{ padding: "0.5rem" }}>
            <h3>Secret Key:</h3>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Secret Key"
              value={secretKey}
              onChange={(e) => setSecretKey(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{ padding: "0.5rem" }}>
            <h3>Temperature (0-1):</h3>
            <TextField
              type="number"
              inputProps={{
                min: 0,
                max: 1,
                step: 0.1,
              }}
              fullWidth
              variant="outlined"
              placeholder="Temperature"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{ padding: "0.5rem" }}>
            <h3>Max Tokens (100-2000):</h3>
            <TextField
              type="number"
              inputProps={{
                min: 100,
                max: 2000,
                step: 100,
              }}
              fullWidth
              variant="outlined"
              placeholder="Max Tokens"
              value={maxTokens}
              onChange={(e) => setMaxTokens(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper style={{ padding: "0.5rem" }}>
            <h3>Memory (0-20):</h3>
            <TextField
              type="number"
              inputProps={{
                min: 1,
                max: 20,
                step: 1,
              }}
              fullWidth
              variant="outlined"
              placeholder="Memory Length"
              value={memoryLength}
              onChange={(e) => setMemoryLength(e.target.value)}
              style={{ marginBottom: "1rem" }}
            />
          </Paper>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Paper
          elevation={3}
          style={{
            height: "55vh",
            padding: "1rem",
            marginTop: "1rem",
            overflowY: "scroll",
          }}
        >
          <List>
            {chat.map((chatItem, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText align={chatItem.isUser ? "right" : "left"}>
                    <MuiMarkdown align={chatItem.isUser ? "right" : "left"}>
                      {chatItem.message}
                    </MuiMarkdown>
                  </ListItemText>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
          <div ref={chatEndRef} />
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleInputSubmit}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            style={{ marginTop: "1rem" }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1rem" }}
          >
            Send
          </Button>
        </form>
      </Grid>
    </Container>
  );
};

export default Chatbot;
