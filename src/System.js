import {
  Paper,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useState } from "react";

const SystemComponent = ({
  prompts,
  setChat,
  setMessageParam,
  setInputValue,
}) => {
  const [role, setRole] = useState("Default");

  const handleSelectChange = (event) => {
    setChat([]);
    setMessageParam([]);
    const selectedRole = event.target.value;
    setRole(selectedRole);
    const selectedObject = prompts.find((obj) => obj.act === role);

    if (selectedObject) {
      setInputValue(selectedObject.prompt);
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
        <Select value={role} onChange={handleSelectChange}>
          {prompts.map((obj) => (
            <MenuItem key={obj.act} value={obj.act}>
              {obj.act}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Paper>
  );
};

export default SystemComponent;
