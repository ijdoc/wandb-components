import { useEffect, useState } from "react";
import * as React from "react";
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Icon from '@mdi/react';
import { mdiRobotExcited } from '@mdi/js';
import Link from '@mui/material/Link';
import { TextField, FormControl, Button } from "@mui/material";
import { teal } from '@mui/material/colors';
import "./App.css";

const primaryColor = teal;
const mainTheme = createTheme({
  palette: {
    primary: teal,
  },
});

// TODO: Replace with flask app coordinates;
const BtnState = {
  DISABLED: 0,
  ENABLED: 1,
  LOADING: 2,
};

const FnState = {
  READY: 0,
  RUNNING: 1,
  SUCCESS: 2,
  ERROR: 3,
};

function App ()
{
  const [btnState, setBtnState] = useState(BtnState.DISABLED);
  const [fnState, setFnState] = useState(FnState.READY);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info");

  const updateName = (value) =>
  {
    if (value.length > 0)
    {
      setBtnState(BtnState.ENABLED);
    } else
    {
      setBtnState(BtnState.DISABLED);
    }
  };

  const sendMessage = async () =>
  {
    setBtnState(BtnState.LOADING);
    setFnState(FnState.RUNNING);
    const message = document.getElementById("messsage").value;
    document.getElementById("messsage").value = "";

    console.log(message);

    // TODO: Add message to chat history
    // TODO: Stand up flask backend
    // TODO: Send payload to flask backend
    // TODO: Receive response from flask backend
    // TODO: Update UI with response

    // try
    // {
    //   const response = await fetch(Endpoints.LAMBDA, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       message,
    //     }),
    //   });
    //   if (response.ok)
    //   {
    //     const data = await response.json(); // Read and parse the response body as JSON
    //     setFnState(FnState.SUCCESS);
    //     setBtnState(BtnState.ENABLED);
    //     console.log(data);
    //     setAlertMsg("Run has been cloned successfully");
    //     setAlertType("success");
    //   } else
    //   {
    //     const errorMessage = await response.text(); // Parse error message if available
    //     setFnState(FnState.ERROR);
    //     setBtnState(BtnState.ENABLED);
    //     console.log(response);
    //     setAlertMsg(errorMessage);
    //     setAlertType("error");
    //   }
    // } catch (error)
    // {
    //   setFnState(FnState.ERROR);
    //   setBtnState(BtnState.ENABLED);
    //   setAlertMsg(error.message);
    //   setAlertType("error");
    // }
    setBtnState(BtnState.DISABLED);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {fnState > FnState.RUNNING &&
        <Alert severity={alertType}>
          {alertMsg}
        </Alert>
      }
      <Stack spacing={1} sx={{
        height: '100vh',
        padding: '10px',
      }}>
        <Card sx={{ width: '100%', height: '100%' }}>
          <CardHeader
            avatar={<Icon path={mdiRobotExcited} size={2} />}
            title="W&B QA Bot"
            subheader={< Link href="https://wandb.ai/wandb/qa-bot">wandb.ai/wandb/qa-bot</Link>}
            align="left"
          />
          <Divider />
          <CardContent align="left">
            Go ahead, ask me anything!
          </CardContent>
        </Card>
        <Paper elevation={12} sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%', padding: "10px" }}>
            <Stack direction="row" spacing={1} sx={{
              alignItems: "center",
            }}>
              <TextField
                id="messsage"
                label="What do you have in mind?"
                fullWidth
                multiline
                size="small"
                maxRows={6}
                variant="outlined"
                onChange={(event) =>
                {
                  updateName(event.target.value);
                }}
                onKeyDown={(e) =>
                {
                  if (e.keyCode === 13 && !e.commandKey)
                  {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
              />
              <Button onClick={sendMessage}
                startIcon={<SendIcon />}
                variant="contained"
                loading={btnState === BtnState.LOADING}
                disabled={btnState === BtnState.DISABLED}
              >Send</Button>
            </Stack>
          </FormControl>
        </Paper>
      </Stack>
    </ThemeProvider>
  );
}

export default App;
