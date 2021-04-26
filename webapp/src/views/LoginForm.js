
import {useState} from "react";
import {LoginButton} from '@inrupt/solid-ui-react';
import {Button} from '@material-ui/core';
import "../css/App.css";
import logo from "../static/radar.svg";

const authOptions = {
    clientName: "Radarin Manager",
  };

function LoginForm(){

  const [oidcIssuer, setOidcIssuer] = useState("");

  const handleChange = (event) => {
    setOidcIssuer(event.target.value);
  };

  return (
    <div className="app-container">
	 <span>
            Log in with:
            <input
              className="oidc-issuer-input "
              type="text"
              name="oidcIssuer"
              list="providers"
              value={oidcIssuer}
              onChange={handleChange}
            />
          <datalist id="providers">
            <option value="https://broker.pod.inrupt.com/" />
            <option value="https://inrupt.net/" />
          </datalist>
          </span>
		  <LoginButton
		     oidcIssuer={oidcIssuer}
		     redirectUrl={window.location.href}
		     authOptions={authOptions}
		   />
    </div>
  );
}

export default LoginForm;