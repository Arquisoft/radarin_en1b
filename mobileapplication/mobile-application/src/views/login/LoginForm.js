import {useState} from "react";
import {LoginButton} from '@inrupt/solid-ui-react';
import {
    Button, 
    FormGroup, 
    MenuItem, 
    TextField, 
    withStyles
} from '@material-ui/core';
import "../../css/App.css";
import logo from "../../static/radar.svg";

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
const styles = {
    root: {
    },
    labelRoot: {
      fontSize: 25,
      color: '#c9c9c9',
      "&.Mui-focused": {
        color: "#ffffff"
      },
      padding: ' 5px 10px 15px 10px',
      margin: ' 0px 10px 20px 0px',
    },
  
    labelFocused: {
      textShadow: 'black 0px 0px 15px',
    },
  
    inputRoot: {   
      position: 'relative',
      
      padding: ' 15px 15px 10px 10px',
      margin: ' 15px 10px 20px 10px',
      //border: '5px solid #ced4da',
      fontSize: 19,
      color: 'white',
      textShadow: "black 0px 0px 10px",
    },
  };

function LoginForm(props){

    const { classes } = props;

    // IDentity Provider, used to store the POD, in this case just inrupt.net
    const [idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, seCurrentUrl] = useState(window.location.href);

    return(
        <div className="App">
            <div className="welcome">
                <div className="float">
                    <div className="spin">
                        <img className="logo-welcome" src={logo} alt="React Logo"></img>
                    </div>
                </div>
                <h1> Welcome to Radarin Radar</h1>
                <h2> Here your locations will be recorded and you will be able to upload your favourite locations</h2>
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
          label = 'Recomended Providers:'
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
        </div> 
    );
};

export default withStyles(styles)(LoginForm);