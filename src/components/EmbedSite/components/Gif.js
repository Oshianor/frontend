import React from 'react'
import CardMedia from "@material-ui/core/CardMedia";
import { makeStyles } from "@material-ui/core/styles";


export default function Gif(props) {
	const classes = useStyles();
	return <img className={classes.media} src={props.url} />;
}


const useStyles = makeStyles(theme => ({
  media: {
    width: "100%"
  },
}));