import React from 'react';
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Favourite from '../../ClassicCard/components/Favourite';
import Vote from '../../ClassicCard/components/Vote';
import Comments from '../../ClassicCard/components/Comment';
import Share from '../../ClassicCard/components/Share';
import TipPost from '../../ClassicCard/components/TipPost';


export default function Action(props) {

	const { topicId, userId, votesCount, commentsCount } = props;
	const classes = useStyles();

	return (
    <Paper className={classes.root}>
      <Vote topicId={topicId} count={votesCount} />
      <Comments topicId={topicId} count={commentsCount} />
      <Favourite topicId={topicId} />

      <Share topicId={topicId} />

      {userId && <TipPost topicId={topicId} />}
    </Paper>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    // maxWidth: 500,
    marginTop: 10,
    width: "100%",
    display: "flex",
    boxShadow: "0px 0px 0px 0px",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: theme.spacing(1, 0.5),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)"
    }
  }
}));
