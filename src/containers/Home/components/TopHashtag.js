import React, {useEffect, useState} from 'react'
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TagButton from '../../../components/TagButton';
import { makeStyles } from "@material-ui/core/styles";
import Axios from 'axios';
import { config } from '../../../../config';


export default function TopHashtag() {
  const classes = useStyles();
  const [tags, setTags] = useState([])
  
  useEffect(() => {
    const clear = setTimeout(async () => {
      const tagData = await Axios.get(config.topTags);
      setTags(tagData.data)
    }, 10000);
    return () => {
      clearTimeout(clear)
    };
  }, [])
	return (
    <div className={classes.root}>
      <Typography variant="caption">Top Hashtags</Typography>
      <Paper className={classes.paper}>
        {tags.map((tag, index) => (
          <Box m={0.5} key={index}>
            <TagButton name={tag} />
          </Box>
        ))}
      </Paper>
    </div>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 20
  },
  paper: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  }
}));