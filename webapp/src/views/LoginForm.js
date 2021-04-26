
import {useState, useEffect} from "react";
import {LoginButton} from '@inrupt/solid-ui-react';

import {
  Button, 
  FormControl,
  FormGroup, 
  InputLabel, 
  MenuItem, 
  TextField, 
  withStyles 
} from '@material-ui/core';

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

const styles = {
  root: {
    
  },
  labelRoot: {
    fontSize: 40,
  },
  inputRoot: {
    borderRadius: 4,
    position: 'relative',
    padding: '25px 20px 10px 12px',
    margin: '30px 100px 30px 12px',
    //border: '5px solid #ced4da',
    fontSize: 35,
    borderColor: '#80bdff',
  },
};

function LoginForm(props){

  const { classes } = props;

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
      <FormGroup label = "Log in form">
      <TextField
          className = "input-text-field"
          label="Identity Provider"
          placeholder="Identity Provider"
          type="url"
          value={idp}
          onChange={(e) => setIdp(e.target.value)}
          InputProps={{
            className: classes.inputRoot,
            endAdornment: (
              <LoginButton oidcIssuer={idp} redirectUrl={currentUrl}>
                <Button variant="contained" color="primary">
                  Login
                  </Button>
              </LoginButton>
            ),
          }}

          InputLabelProps = {{
            classes : {
              root: classes.labelRoot,
            }
          }}
        />
        <TextField
          select
          label = 'Recomended POD Providers:'
          placeholder='Identity Provider:'
          type = 'url'
          value = {idp}
          onChange = {(e) => setIdp(e.target.value)}
          InputProps={{
            className: classes.inputRoot
          }}

          InputLabelProps =  {{
            className: classes.labelRoot,
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

export default withStyles(styles)(LoginForm);