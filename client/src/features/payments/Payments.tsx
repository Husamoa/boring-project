import React, {FunctionComponent} from "react";
import StripeCheckout from "react-stripe-checkout";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {AttachMoney} from "@material-ui/icons";
import {connect} from "react-redux";
import * as actions from '../../actions'
import {ProfileProps} from "../../models/propTypes";

const useStyles = makeStyles((theme) => ({
    root: {},
    buyPremium: {
        display: "flex",
        alignItems: "center"
    },
    paper: {
        marginTop: theme.spacing(8),
        paddingLeft: theme.spacing(4),
        paddingBottom: theme.spacing(6)
    },
    typography: {
        margin: theme.spacing(1)
    },
    button: {
        margin: theme.spacing(1),
        color: "white"
    },
    creditsInfo: {
        display: "block"
    }
}));

const Payments:FunctionComponent<ProfileProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.buyPremium}>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h3">
                        Mój portfel
                    </Typography>
                </div>
                <StripeCheckout
                    name={"Potrzebny lekarz"}
                    description={"5 zł za 5 dni premium"}
                    currency={'pln'}
                    amount={500}
                    token={token => props.handleToken && props.handleToken(token)}
                    stripeKey={process.env.REACT_APP_STRIPE_KEY ? process.env.REACT_APP_STRIPE_KEY : ""}>
                    <Button
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<AttachMoney/>}
                    >
                        Kup premium
                    </Button>
                </StripeCheckout>
            </div>
            <Typography className={classes.creditsInfo} component="h4" variant="h5">
                Masz {props.auth.credits} dni premium.
            </Typography>
        </div>

    );
}

function mapStateToProps({auth}:ProfileProps) {
    return {auth: auth};
}

export default connect(mapStateToProps, actions)(Payments);
