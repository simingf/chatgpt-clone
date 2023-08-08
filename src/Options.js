import { Grid, Paper, TextField } from "@mui/material";

const OptionsComponent = ({
  secretKey,
  temperature,
  maxTokens,
  memoryLength,
  setSecretKey,
  setTemperature,
  setMaxTokens,
  setMemoryLength,
}) => {
  return (
    <Grid container spacing={2} style={{ marginTop: "0.5rem" }}>
      <Grid item xs={3}>
        <Paper style={{ padding: "0.5rem" }}>
          <h3>Key</h3>
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
          <h3>Temp</h3>
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
          <h3>Token</h3>
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
          <h3>Mem</h3>
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
  );
};

export default OptionsComponent;
