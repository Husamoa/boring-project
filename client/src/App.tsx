import React, {useEffect, FC} from "react";
import {BrowserRouter, Route} from "react-router-dom";
import {connect} from "react-redux";
import * as actions from "./actions";

import Header from "./features/header/Header"
import {Container} from "@mui/material";
import {createTheme, ThemeProvider, makeStyles} from "@mui/material/styles";
import {purple} from "@mui/material/colors";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile"
import Payments from "./features/payments/Payments";

import "./styles/App.scss";
import {ProfileProps} from "./models/propTypes";

const Landing:FC = () => <h2>Landing</h2>

const theme = createTheme({
    palette: {
        primary: {
            // Purple and green play nicely together.
            main: purple[500],
        },
        secondary: {
            // This is green.A700 as hex.
            main: '#11cb5f',
        },
    },
});

const App:FC<ProfileProps> = (props) => {

    useEffect(() => {
        if (props.fetchUser) {
            props.fetchUser()
        }
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <Header/>
                <Container style={{marginTop: '100px'}}>
                    <Route path="/" element={<Landing />} />
                    <Route path="/sign-in" element={<SignIn />} />
                    <Route path="/sign-up" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/payments" element={<Payments />} />
                </Container>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default connect(null, actions)(App);
