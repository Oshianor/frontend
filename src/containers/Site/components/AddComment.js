import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Box from "@material-ui/core/Box";
import Slide from "@material-ui/core/Slide";
import { connect } from "react-redux";
import { setToggleComment } from "../../../store/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { config } from "../../../../config";
import axios from "axios";
import Alert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import Router from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const mapStateToProps = state => {
  return {
    user: state.user,
    topic: state.topics,
    comment: state.comment
  };
};

const mapDispatchToProps = {
  setToggleComment
};


const AddComment = props => {
  const { comment, setToggleComment, user, topic } = props;
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [res, setRes] = useState({
    err: false,
    msg: "",
    status: ""
  });

  const handleReply = async () => {
    try {
      setLoading(true);
      const trans = await axios.post(
        config.reply,
        { content, topicId: topic.singleTopic._id, commentId: comment.commentId },
        { headers: { "x-auth-token": user.token } }
      );

      console.log("trans", trans);

			Router.reload();
			
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      });
    }
  };

  const handleComment = async () => {
    try {
      setLoading(true);
      const trans = await axios.post(
        config.comment,
        { content, topicId: topic.singleTopic._id },
        { headers: { "x-auth-token": user.token } }
      );

      console.log("trans", trans);

      

			Router.reload();
			
    } catch (error) {
      setLoading(false);
      console.log("error", error);
      setRes({
        err: true,
        msg: error.response.data,
        status: "warning"
      });
    }
  };

  const handleForm = async () => {
    if (comment.type === "reply") {
      handleReply();
    } else {
      handleComment();
    }
  };

  const handleChange = async (event) => {
    setContent(event.target.value)
  }


  const handleClose = () => {
    setToggleComment({ openComment: false, commentId: null, type: null });
  }

  return (
    <Dialog
      open={comment.openComment}
      maxWidth="sm"
      TransitionComponent={Transition}
      keepMounted
      onClose={() =>
        setToggleComment({
          openComment: false,
          commentId: null,
          type: null
        })
      }
      // onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {comment.type === "reply" ? (
          <Box display={"flex"} flexDirection={"row"}>
            <Typography>Replying @</Typography>
            <Typography component="a" color="primary">
              {comment.username}
            </Typography>
          </Box>
        ) : (
          <Typography>Comment</Typography>
        )}
      </DialogTitle>
      <DialogContent className={classes.root}>
        {res.err && <Alert severity={res.status}>{res.msg}</Alert>}
        <TextField
          variant="outlined"
          error={res.err}
          value={content}
          multiline
          rows={3}
          rowsMax={4}
          onChange={handleChange}
          className={classes.TextField}
        />
      </DialogContent>
      <Box pl={3} pr={3}>
        {user.user ? (
          <Typography variant="caption">
            You are currently Logged In. Any comment made would be done using
            your account details
          </Typography>
        ) : (
          <Typography variant="caption">
            You are currently not <a href="/login">Logged In</a>. Any comment
            made would be done Anonymously
          </Typography>
        )}
      </Box>

      <DialogActions>
        <Button onClick={handleClose} color="default" variant="outlined">
          Cancel
        </Button>
        <Button
          disabled={loading}
          onClick={handleForm}
          color="primary"
          variant="contained"
        >
          {loading ? <CircularProgress size={25} /> : "Send"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    width: "100%"
  },
  TextField: {
    width: "100%"
  }
}));

export default connect(mapStateToProps, mapDispatchToProps)(AddComment);
