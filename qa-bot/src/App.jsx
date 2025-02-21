import { useEffect, useState } from "react";
import * as React from "react";
import SendIcon from '@mui/icons-material/Send';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Icon from '@mdi/react';
import { mdiRobotExcited } from '@mdi/js';
import Link from '@mui/material/Link';
import { TextField, FormControl, Button } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { teal, grey } from '@mui/material/colors';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { MuiMarkdown, getOverrides } from 'mui-markdown';
import "./App.css";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
const wandbEntity = import.meta.env.VITE_WANDB_ENTITY;
const wandbProject = import.meta.env.VITE_WANDB_PROJECT;
const weaveOp = import.meta.env.VITE_WEAVE_OP;

const mainTheme = createTheme({
  palette: {
    primary: teal,
    secondary: grey,
  },
});

const BtnState = {
  DISABLED: 0,
  ENABLED: 1,
  LOADING: 2,
};

function App ()
{
  const [btnState, setBtnState] = useState(BtnState.DISABLED);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState("info");
  const [isSnackbarOpen, setSnackbarOpen] = React.useState(false);
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

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
    const question = document.getElementById("messsage").value;
    document.getElementById("messsage").value = "";
    setQuestion(question);
    setAnswer("");

    try
    {
      const response = await fetch(`${backendEndpoint}/qa-bot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "question": question }),
      });
      if (response.ok)
      {
        const data = await response.json(); // Read and parse the response body as JSON
        setBtnState(BtnState.ENABLED);
        setAnswer(data.answer);
        // setAlertMsg("Message delivered!");
        // setAlertType("success");
        // setSnackbarOpen(true);
      } else
      {
        const errorMessage = await response.text(); // Parse error message if available
        setBtnState(BtnState.ENABLED);
        console.log(response);
        setAlertMsg(errorMessage);
        setAlertType("error");
        setSnackbarOpen(true);
      }
    } catch (error)
    {
      setBtnState(BtnState.ENABLED);
      setAlertMsg(error.message);
      setAlertType("error");
      setSnackbarOpen(true);
    }
    setBtnState(BtnState.DISABLED);
  };

  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isSnackbarOpen} autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}>
        <Alert
          severity={alertType}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      <Stack spacing={1} sx={{
        height: '100vh',
        padding: '0px',
      }}>
        <Card sx={{ width: '100%', height: '100%', padding: '10px', paddingBottom: '90px' }}>
          <CardContent align="left" sx={{ overflowY: 'auto', height: '100%' }}>
            <Stack spacing={1}>
              <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
                <Paper elevation={2} sx={{ padding: '10px', paddingRight: '20px', backgroundColor: mainTheme.palette.primary[50] }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar>
                      <Icon path={mdiRobotExcited} size={1} />
                    </Avatar>
                    <div>
                      {"Hello! I'm a Q&A bot. Ask me anything!"}<br />
                      {<Link target="_blank" href={`https://wandb.ai/${wandbEntity}/${wandbProject}/weave/calls?filter={"opVersionRefs":["weave:///${wandbEntity}/${wandbProject}/op/${weaveOp}:*"]}`}>{wandbEntity}/{wandbProject}</Link>}
                    </div>
                  </Stack>
                </Paper>
                <div style={{ width: "20%" }}></div>
              </Stack>
              {question.length > 0 ?
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                  <div style={{ width: "20%" }}></div>
                  <Paper elevation={2} align="right" sx={{ padding: '10px', paddingLeft: '20px', backgroundColor: mainTheme.palette.secondary[50] }}>
                    <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-end">
                      <div>
                        {question}
                      </div>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </Stack>
                  </Paper>
                </Stack> : null
              }
              {answer.length > 0 ?
                <Stack direction="row" spacing={2} alignItems="center" justifyContent="flex-start">
                  <Paper elevation={2} sx={{ padding: '10px', paddingRight: '20px', backgroundColor: mainTheme.palette.primary[50] }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar>
                        <Icon path={mdiRobotExcited} size={1} />
                      </Avatar>
                      <div>
                        <MuiMarkdown overrides={{
                          ...getOverrides(), // This will keep the other default overrides.
                          h1: { component: "h1" },
                          h2: { component: "h2" },
                          h3: { component: "h3" },
                          h4: { component: "h4" },
                        }}>{answer}
                        </MuiMarkdown>
                      </div>
                    </Stack>
                  </Paper>
                  <div style={{ width: "20%" }}></div>
                </Stack> : null
              }
            </Stack>
          </CardContent>
        </Card>
        <Paper elevation={12} sx={{ width: '100%' }}>
          <FormControl sx={{ width: '100%', padding: "10px" }}>
            <Stack direction="row" spacing={1} sx={{
              alignItems: "center",
            }}>
              <TextField
                id="messsage"
                label="Ask me anything!"
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
