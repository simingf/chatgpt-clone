import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Container, Typography } from "@mui/material";
import OptionsComponent from "./Options";
import SystemComponent from "./System";
import Chatbot from "./Chatbot";
import React, { useState } from "react";
import prompts from "./prompts.json";

function App() {
  const [chat, setChat] = useState([]);
  const [secretKey, setSecretKey] = useState("");
  const [temperature, setTemperature] = useState("0.8");
  const [maxTokens, setMaxTokens] = useState("1000");
  const [memoryLength, setMemoryLength] = useState("5");
  const [systemMessage, setSystemMessage] = useState(
    "You are a helpful assistant."
  );
  const [messageParam, setMessageParam] = useState([]);
  return (
    <Container>
      {/* <Typography align="center" variant="h5" padding="1rem">
        Siming's ChatGPT
      </Typography> */}
      <OptionsComponent
        secretKey={secretKey}
        temperature={temperature}
        maxTokens={maxTokens}
        memoryLength={memoryLength}
        setSecretKey={setSecretKey}
        setTemperature={setTemperature}
        setMaxTokens={setMaxTokens}
        setMemoryLength={setMemoryLength}
      />
      <SystemComponent
        objectList={prompts}
        systemMessage={systemMessage}
        setSystemMessage={setSystemMessage}
        setChat={setChat}
        setMessageParam={setMessageParam}
      />
      <Chatbot
        chat={chat}
        setChat={setChat}
        messageParam={messageParam}
        setMessageParam={setMessageParam}
        secretKey={secretKey}
        temperature={temperature}
        maxTokens={maxTokens}
        memoryLength={memoryLength}
        systemMessage={systemMessage}
      />
    </Container>
  );
}

export default App;
