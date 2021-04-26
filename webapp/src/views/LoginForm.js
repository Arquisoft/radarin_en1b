
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
    name: 'Inrupt',
  },
  {
    value: 'https://solidweb.org/',
    name: 'Solid Web',
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
    color: '#c9c9c9',
    "&.Mui-focused": {
      color: "#ffffff"
    },
    margin: ' 30px 20px 10px 40px',
    textShadow: "black 0px 0px 10px",
  },

  labelFocused: {
    color: 'red',
    textShadow: 'black 0px 0px 15px',
  },

  inputRoot: {
    borderRadius: 4,
    
    position: 'relative',
    
    padding: '50px 20px 10px 20px',
    margin: '40px 130px 30px 35px',
    //border: '5px solid #ced4da',
    fontSize: 35,
    color: 'white',
    textShadow: "black 0px 0px 10px",
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
              focused: classes.labelFocused,
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
            className: classes.inputRoot,
          }}

          InputLabelProps =  {{
            classes: {
              root: classes.labelRoot,
              focused: classes.labelFocused,
            }
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