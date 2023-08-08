import {
  Button,
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

const Chatbot = ({
  chat,
  setChat,
  messageParam,
  setMessageParam,
  secretKey,
  temperature,
  maxTokens,
  memoryLength,
  systemMessage,
}) => {
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef(null);

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

      const input_message_param = [
        {
          role: "system",
          content: systemMessage,
        },
        ...messageParam,
        { role: "user", content: user_input },
      ];

      console.log("input_message_param", input_message_param);

      try {
        const response = await axios.post(
          "https://api.openai.com/v1/chat/completions",
          {
            model: "gpt-3.5-turbo",
            messages: input_message_param,
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
        const newMessageParam = [
          ...messageParam.slice(Math.max(messageParam.length - subtract, 0)),
          { role: "user", content: user_input },
          { role: "assistant", content: chatbotResponse },
        ];

        setMessageParam(newMessageParam);
        console.log("messages", newMessageParam);

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
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Paper
          style={{
            height: "40vh",
            padding: "0.5rem",
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
            multiline
            fullWidth
            variant="outlined"
            placeholder="Type your message..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleInputSubmit(e);
              }
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "0.5rem" }}
          >
            Send
          </Button>
        </form>
      </Grid>
    </Grid>
  );
};

export default Chatbot;
