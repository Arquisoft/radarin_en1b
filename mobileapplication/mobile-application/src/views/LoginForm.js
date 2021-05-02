import "../css/App.css";
import "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
function LoginForm(){
    return(
        <div className="App">
            <div className=''>
                <div className="welcome">
                    <h1>Radarin Radar</h1>
                    <h3>"Redefining Social Networks"</h3>
                    <br/>
                    <h3>Here you will know if a friend is nearby you</h3>
                    <br/>
                    <h3>As well as save your favourite locations</h3>
                    <br/>
                    <NavLink to="/login"> 
                        <Button> 
                            Log In / Register
                        </Button>
                    </NavLink>
                </div>
            </div>
        </div> 
    );
}

export default LoginForm;