import React from 'react'
import Vote from './Vote';
import TipPost from './TipPost';
import Button from "@material-ui/core/Button";
import Reply from "@material-ui/icons/Reply"
import { connect } from "react-redux";
import { setToggleComment } from "../../../store/actions";

const mapDispatchToProps = {
  setToggleComment
};


const CommentAction = ({ commentId, votesCount, setToggleComment, username }) => {
  const handleOpen = () => {
    setToggleComment({
      openComment: true,
      commentId,
      username,
      type: "reply"
    });
  };

  return (
    <div>
      <Vote commentId={commentId} count={votesCount} />
      <Button
        size="small"
        variant="text"
        color="default"
        endIcon={<Reply />}
        onClick={handleOpen}
      >
        Reply
      </Button>
      <TipPost />
    </div>
  );
};


export default connect(null, mapDispatchToProps)(CommentAction);
