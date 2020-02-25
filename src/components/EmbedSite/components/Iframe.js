import React, { useState, useEffect } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import axios from "axios";
import { config } from "../../../../config";


export default function Iframe(props) {
	const { url } = props;
  const classes = useStyles();
  const [loadable, setLoadable] = useState(false)

	const error = (err) => {
		console.log("err iframe", err);
  }
  
  useEffect(() => {
    handleLoadable();
  }, [])


  const handleLoadable = async () => {
    try {
      const load = await axios.get(config.validateUrl + "?url=" + url);

      console.log("load", load);

      setLoadable(load.data.loadable);
    } catch (error) {
      console.log("error", error);
      
    }
  }


	return (
    <>
      {loadable ? (
        <iframe
          id="frame"
          // title="Inline Frame Example"
          // width="300"
          // height="200"
          className={classes.root}
          src={url}
          onLoad={error}
          allow="fullscreen"
        >
          <p>Your browser does not support iframes.</p>
        </iframe>
      ) : (
        <img
          className={classes.root}
          src={
            "//image.thum.io/get/width/500/crop/900/png/auth/3228-www.tipestry.com/" +
            props.url
          }
        />
      )}
    </>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    // borderRight: "10px solid gray",
    width: "100%",
    height: "60vh",
    marginTop: 20
  }
}));

