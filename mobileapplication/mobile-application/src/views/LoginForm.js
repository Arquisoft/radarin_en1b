import "../css/App.css";
import "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
function LoginForm(){
    return(
        <div className="App">
            <div className=''>
                <div className="welcome">
                    <h1>Welcome!</h1>
                    <br/>
                    <h3>Here you can see your friends location</h3>
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