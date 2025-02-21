import { useEffect, useState } from "react";
import * as React from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import
{
  TextField,
  Box,
  FormControl,
} from "@mui/material";
import "./App.css";

const backendEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT;
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
  const [fnState, setFnState] = useState(FnState.DEFAULT);
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

  const runTrigger = async () =>
  {
    setBtnState(BtnState.LOADING);
    setFnState(FnState.RUNNING);
    const runName = document.getElementById("run-name").value;
    const runPayload = document.getElementById("run-payload").value;

    try
    {
      const response = await fetch(`${backendEndpoint}/clone-run`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          runName,
          runPayload,
        }),
      });
      if (response.ok)
      {
        const data = await response.json(); // Read and parse the response body as JSON
        setFnState(FnState.SUCCESS);
        setBtnState(BtnState.ENABLED);
        console.log(data);
        setAlertMsg("Run has been cloned successfully");
        setAlertType("success");
      } else
      {
        const errorMessage = await response.text(); // Parse error message if available
        setFnState(FnState.ERROR);
        setBtnState(BtnState.ENABLED);
        console.log(response);
        setAlertMsg(errorMessage);
        setAlertType("error");
      }
    } catch (error)
    {
      setFnState(FnState.ERROR);
      setBtnState(BtnState.ENABLED);
      setAlertMsg(error.message);
      setAlertType("error");
    }



    // setBtnState(BtnState.DISABLED);
  }

  return (
    <div>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 480 }}>
          <Stack sx={{ width: '100%' }} spacing={1}>
            <TextField
              id="run-name"
              label="Enter the name of a run"
              onChange={(event) =>
              {
                updateName(event.target.value);
              }}
              placeholder="awesome-run-123"
              focused={true}
              name="run-name"
            />
            <TextField
              id="run-payload"
              label="Configuration Overrides"
              multiline
              rows={4}
              defaultValue={"{\n  \"batchSize\": 100,\n}"}
              variant="standard"
            />
            <LoadingButton
              onClick={runTrigger}
              startIcon={<RocketLaunchIcon />}
              variant="contained"
              loading={btnState === BtnState.LOADING}
              disabled={btnState === BtnState.DISABLED}
            >
              Clone Run
            </LoadingButton>
            {fnState > FnState.RUNNING &&
              <Alert severity={alertType}>
                {alertMsg}
              </Alert>
            }
          </Stack>
        </FormControl>
      </Box>
    </div>
  );
}

export default App;
