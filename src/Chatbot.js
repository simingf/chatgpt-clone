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
import { MuiMarkdown } from "mui-markdown";
import React, { useEffect, useRef } from "react";
import {getGPT} from "./GPT";

const Chatbot = ({
  inputValue,
  setInputValue,
  chat,
  setChat,
  messageParam,
  setMessageParam,
  secretKey,
  temperature,
  maxTokens,
  memoryLength,
}) => {
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

      let chatbotResponse = await getGPT(
        user_input,
        messageParam,
        temperature,
        maxTokens,
        secretKey,
        memoryLength,
      );

      const newMessageParam = [
        ...messageParam,
        { role: "user", content: user_input },
        { role: "assistant", content: chatbotResponse },
      ];

      setMessageParam(newMessageParam);
      console.log("all messages", newMessageParam);

      setChat((prevChat) => [
        ...prevChat,
        { message: chatbotResponse, isUser: false },
      ]);
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
