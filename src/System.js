import {
  Paper,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const SystemComponent = ({
  objectList,
  systemMessage,
  setSystemMessage,
  setChat,
  setMessageParam,
  setInputValue,
}) => {
  const [act, setAct] = useState("Default");

  const handleSelectChange = (event) => {
    setChat([]);
    setMessageParam([]);
    const selectedAct = event.target.value;
    setAct(selectedAct);
    const selectedObject = objectList.find((obj) => obj.act === selectedAct);

    if (selectedObject) {
      setSystemMessage(selectedObject.prompt);
      setInputValue(selectedObject.prompt);
    } else {
      setSystemMessage("You are a helpful assistant.");
    }
  };

  return (
    <Paper
      style={{
        padding: "0.5rem",
        display: "flex",
        flexDirection: "column",
        marginTop: "0.5rem",
        marginBottom: "0.5rem",
      }}
    >
      <h3>Preset</h3>
      <FormControl>
        <Select value={act} onChange={handleSelectChange}>
          {objectList.map((obj) => (
            <MenuItem key={obj.act} value={obj.act}>
              {obj.act}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* <p>{systemMessage}</p> */}
    </Paper>
  );
};

export default SystemComponent;
