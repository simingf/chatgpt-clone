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
  const [inputValue, setInputValue] = useState("");
  const [chat, setChat] = useState([]);
  const [secretKey, setSecretKey] = useState("");
  const [temperature, setTemperature] = useState("0.8");
  const [maxTokens, setMaxTokens] = useState("6000");
  const [memoryLength, setMemoryLength] = useState("5");
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
        prompts={prompts}
        setChat={setChat}
        setMessageParam={setMessageParam}
        setInputValue={setInputValue}
      />
      <Chatbot
        inputValue={inputValue}
        setInputValue={setInputValue}
        chat={chat}
        setChat={setChat}
        messageParam={messageParam}
        setMessageParam={setMessageParam}
        secretKey={secretKey}
        temperature={temperature}
        maxTokens={maxTokens}
        memoryLength={memoryLength}
      />
    </Container>
  );
}

export default App;
