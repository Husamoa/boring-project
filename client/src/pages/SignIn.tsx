import React, {FunctionComponent, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GoogleButton from "react-google-button";
import {Divider} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {connect} from "react-redux";
import * as actions from "../actions";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@mui/material/Alert';
import {CustomAlertProps, ProfileProps} from "../models/propTypes";

const Alert:FunctionComponent<CustomAlertProps> = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    typography: {
        margin: theme.spacing(1)
    },
    divider: {
        marginBottom: theme.spacing(2),
        width: "100%"
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn:FunctionComponent<ProfileProps> = (props) => {
    const classes = useStyles();
    const {handleSubmit, control} = useForm();
    const [openInfo, setOpenInfo] = React.useState(false);
    const [errors, setErrors] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        if (props.auth) {
            navigate('/profile')
        }

    })

    const handleClose = () => {
        setErrors(false);
        setOpenInfo(false);
    }

    const loginWithGoogle = () => {
        window.open('/auth/google', "_self")
    }

    const onSubmit = async (data:any) => {
        try {
            if (props.loginUser) {
                await props.loginUser(data)
            }
        } catch (err) {
            setErrors(err.message);
            setOpenInfo(true);
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline/>
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon/>
                </Avatar>
                <div>
                    <Typography className={classes.typography} component="h1" variant="h5">
                        Zaloguj si??
                    </Typography>
                </div>
                <Divider className={classes.divider}/>
                <GoogleButton onClick={loginWithGoogle} style={{width: "100%", marginBottom: "5%"}} type={"dark"}
                              label={"Kontynuuj przez portal Google"}/>
                <div>
                    <form className={classes.form} onSubmit={handleSubmit((data) => onSubmit(data))}>
                        <Controller
                            name={"username"}
                            control={control}
                            defaultValue={''}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Adres email"
                                    name="email"
                                    autoComplete="email"
                                    autoFocus
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}

                                />
                            )}
                            rules={{required: 'Pole email jest wymagane'}}
                        />
                        <Controller
                            name={"password"}
                            control={control}
                            defaultValue={''}
                            render={({field: {onChange, value}, fieldState: {error}}) => (
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="Has??o"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={value}
                                    onChange={onChange}
                                    error={!!error}
                                    helperText={error ? error.message : null}
                                />
                            )}
                            rules={{required: 'Pole has??o jest wymagane'}}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Zapami??taj mnie"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Zaloguj si??
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Zapomnia??ej has??a?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Nie masz jeszcze konta? Zarejestruj si??"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </div>
            {errors && <Snackbar open={openInfo} onClose={handleClose}>
                <Alert severity="error" onClose={handleClose}>
                    {errors}
                </Alert>
            </Snackbar>}

        </Container>
    );
}

function mapStateToProps({auth}:ProfileProps) {
    return {auth: auth};
}

export default connect(mapStateToProps, actions)(SignIn);
