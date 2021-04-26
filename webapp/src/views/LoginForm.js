
import {useState, useEffect} from "react";
import {LoginButton} from '@inrupt/solid-ui-react';
import {Button, FormControl, FormGroup, InputLabel, MenuItem, TextField} from '@material-ui/core';
import "../css/App.css";
import logo from "../static/radar.svg";

const providers = [

  {
    value: 'https://inrupt.net',
    name: 'inrupt',
  },
  {
    value: 'https://solidweb.org/',
    name: 'solid Web',
  },
  {
    value: 'https://solidcommunity.net/',
    name: 'Solid Community',
  },
];

const authOptions = {
    clientName: "Radarin Manager",
  };

function LoginForm(){

  const [idp,setIdp] = useState('https://inrupt.net');
  const [oidcIssuer, setOidcIssuer] = useState("");
  const [currentUrl, setCurrentUrl] = useState("https://localhost:3000");

  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, [setCurrentUrl]);

  return (
    <div className="app-container">
      <FormGroup label = "Register Puto">
      <TextField
          label="Identity Provider"
          placeholder="Identity Provider"
          type="url"
          value={idp}
          onChange={(e) => setIdp(e.target.value)}
          InputProps={{
            endAdornment: (
              <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                <Button variant="contained" color="primary">
                  Login
                  </Button>
              </LoginButton>
            ),
          }}
        />
        <TextField
          select
          label = 'Recomended POD Providers:'
          placeholder='Identity Provider:'
          type = 'url'
          value = {idp}
          onChange = {(e) => setIdp(e.target.value)}
          inruptProps={{
            endAdornment: (
              <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                <Button variant="contained" color="primary">
                  Login
                  </Button>
              </LoginButton>
            )
          }}
        >
          {providers.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.name}
            </MenuItem>
          )
          )}
        </TextField>
      </FormGroup>
		  
    </div>
  );
}

export default LoginForm;