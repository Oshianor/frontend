import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { toggleGift, toggleRefresh } from "../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import {
  fade,
  withStyles
} from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";
import InputLabel from "@material-ui/core/InputLabel";
import { config } from "../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = (state) => {
	return {
		user: state.user,
		gift: state.gift
	}
}


const mapDispatchToProps = {
  toggleGift,
  toggleRefresh
};


const nameIcon = {
  dogecoin: "/static/tipcoins/doge.svg",
  bitcoin: "/static/tipcoins/bit.svg",
  ethcoin: "/static/tipcoins/eth.svg",
  ethtipcoin: "/static/tipcoins/tip-small.png",
  ethtipc: "/static/tipcoins/tipc-small.png",
  ethxrtcoin: "/static/tipcoins/xrt-small.png"
};

const GiftModal = (props) => {
	const { gift, toggleGift, user, toggleRefresh } = props;
	const classes = useStyles()
	const [coin, setCoin] = useState("bitcoin");
	const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: ""
  })


	const handleGift = async () => {
    try {
      setLoading(true);
      const trans = await axios.post(config.tipPost, { amount, coin, topicId: gift.topicId }, { headers: { "x-auth-token": user.token } })

      console.log("trans", trans);
      
      setLoading(false);
      setAmount(0)

      Router.reload();

      toggleGift();
      // toggleRefresh();
      

    } catch (error) {
      setLoading(false);
      console.log("error", error);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      })
    }
  }


  const renderBalance = () => {
    switch (coin) {
      case "dogecoin":
        return user.user.doge.balance;
      case "bitcoin":
        return user.user.btc.balance;
      case "ethcoin":
        return user.user.eth.ethApiBalance;
      case "ethtipcoin":
        return user.user.eth.tipcoinApiBalance;
      case "ethxrtcoin":
        return user.user.eth.xrtApiBalance;
      case "ethtipc":
        return user.user.eth.tipccoinApiBalance;
      default:
        break;
    }
  }


  const handleAmount = (event) => {
    setAmount(event.target.value);
  }
  

  return (
    <Dialog
      open={gift.open}
      maxWidth="xs"
      TransitionComponent={Transition}
      keepMounted
      onClose={() => toggleGift()}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">Gift</DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        <div>
          <div className={classes.header}>
            <Typography>Choose Currency</Typography>
            <div className={classes.balance}>
              <img src={nameIcon[coin]} className={classes.balanceImg} />
              <Typography>{renderBalance()}</Typography>
            </div>
          </div>
          <div className={classes.iconRoot}>
            <img
              src="/static/tipcoins/bit.svg"
              alt="btc"
              onClick={() => setCoin("bitcoin")}
              className={clsx(
                classes.img,
                coin === "bitcoin" && classes.selected
              )}
            />
            <img
              src="/static/tipcoins/doge.svg"
              alt="doge"
              onClick={() => setCoin("dogecoin")}
              className={clsx(
                classes.img,
                coin === "dogecoin" && classes.selected
              )}
            />
            <img
              src="/static/tipcoins/eth.svg"
              onClick={() => setCoin("ethcoin")}
              alt="tipcoin"
              className={clsx(
                classes.img,
                coin === "ethcoin" && classes.selected
              )}
            />
            <img
              src="/static/tipcoins/tip-small.png"
              alt="tipcoin"
              onClick={() => setCoin("ethtipcoin")}
              className={clsx(
                classes.img,
                coin === "ethtipcoin" && classes.selected
              )}
            />
            <img
              src="/static/tipcoins/tipc-small.png"
              alt="tipcoin"
              onClick={() => setCoin("ethtipc")}
              className={clsx(
                classes.img,
                coin === "ethtipc" && classes.selected
              )}
            />
            <img
              src="/static/tipcoins/xrt-small.png"
              alt="tipcoin"
              onClick={() => setCoin("ethxrtcoin")}
              className={clsx(
                classes.img,
                coin === "ethxrtcoin" && classes.selected
              )}
            />
          </div>
        </div>
        <Divider />

        {/* 
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running.
          </DialogContentText> 
        */}

        <AmountInput
          className={classes.margin}
          autoFocus={true}
          onChange={handleAmount}
          value={amount}
          label="Custom CSS"
          variant="outlined"
          id="custom-css-outlined-input"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => toggleGift()} color="default" variant="outlined">
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleGift} color="primary" variant="contained">
          {loading ? <CircularProgress /> : "Gift"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column"
  },
  iconRoot: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  img: {
    border: "1px solid darkgray",
    width: 35,
    height: 35,
    margin: 5,
    borderRadius: 5,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#50557b"
    }
  },
  selected: {
    backgroundColor: "#50557b"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  balance: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row"
  },
  balanceImg: {
    width: 15
  }
}));

const AmountInput = withStyles(theme => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3)
    }
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: theme.palette.common.white,
    border: "1px solid #ced4da",
		fontSize: 30,
		height: 50,
    width: 120,
    padding: "10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:focus": {
      // boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      borderColor: theme.palette.primary.main
    }
  }
}))(InputBase);



export default connect(mapStateToProps, mapDispatchToProps)(GiftModal);