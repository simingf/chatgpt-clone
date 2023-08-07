import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Typography } from '@mui/material';
import Chatbot from "./Chatbot";

function App() {
  return (
    <div>
      <Typography align="center" variant="h4" padding="1rem">Siming's ChatGPT</Typography>
      <Chatbot />
    </div>
  );
}

export default App;
