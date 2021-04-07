
import { useState } from "react";
//import {useSession} from '@inrupt/solid-ui-react/dist';
import { LoginButton } from '@inrupt/solid-ui-react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../login.css';


const useStyles = makeStyles({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    root: {
        maxWidth: 250,
        margin:0,
        float:'none',
        marginBottom: 10,
    },
    maxWidth: 300,
    margin:0,
    float:'none',
    variant: 'dark',
    bg: 'dark',
    bullet: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        margin:0,
        float:'none',
        marginBottom: 10,
    },
});

function LoginForm() {
    // IDentity Provider, used to store the POD, in this case just inrupt.net
    const [idp, setIdp] = useState("https://inrupt.net");
    const [currentUrl, setCurrentUrl] = useState(window.location.href);

    //Used to give a name to the card used to the login and to associate it with the styles
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <div id="card-container">
            <div className="bg">
                <Card className={classes.root} variant="dark" bg="dark">
                    <CardContent>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Radarin en1b
                        </Typography>
                        <Typography variant="h5" component="h2">
                            Where you can locate your friends!
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                            Here you will be able to locate your friends by proximity, see your previous locations and feature them!
                        </Typography>
                    </CardContent>
                    <CardActions class="d-flex justify-content-center">
                        <LoginButton
                            oidcIssuer={idp}
                            redirectUrl={currentUrl}
                        >
                            <Button variant="contained" color="primary" text-align="center">
                                Log In
                            </Button>
                        </LoginButton>
                    </CardActions>
                </Card>
            </div>
        </div>
    );
}

export default LoginForm;