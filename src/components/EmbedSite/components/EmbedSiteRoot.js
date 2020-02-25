import React from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Iframe from "./Iframe";
import Image from './Image';

export default function EmbedSiteRoot(props) {
	const classes = useStyles();
	const { topic } = props;

  console.log("topic", topic);

	return (
    <div className={classes.root}>
      {topic && topic.type === "site" && <Iframe url={topic.url} />}
      {topic && topic.type === "image" && <Image url={topic.url} />}
    </div>
  );
}


const useStyles = makeStyles(theme => ({
	root: {
		width: "100%"
	}
}));