import React, { useState } from 'react';
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShowChart from "@material-ui/icons/ShowChartOutlined";
import NewReleases from "@material-ui/icons/NewReleasesOutlined";
import AddPost from '../AddPost';


const SortOptions = (props) => {
	const classes = useStyles();
  const { disabled } = props;
  
	const [addPost, setAddPost] = useState(false);

	return (
    <Paper className={classes.root}>
      <div>
        <Typography variant="overline">Sort Post by</Typography>
        <div>
          <Button
            variant={disabled === "Popular" ? "contained" : "outlined"}
            color="primary"
            // disabled={disabled === "Popular"}
            href={disabled === "Popular" ? null : "/"}
            size="small"
            className={classes.button}
            startIcon={<ShowChart />}
          >
            Popular
          </Button>
          <Button
            variant={disabled === "Recent" ? "contained" : "outlined"}
            color="primary"
            // disabled={disabled === "Recent"}
            size="small"
            href={disabled === "Recent" ? null : "/recent"}
            className={classes.button}
            startIcon={<NewReleases />}
          >
            Recent
          </Button>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={() => setAddPost(!addPost)}
        // size="small"
        className={classes.button}
        // startIcon={<NewReleases />}
      >
        Upload A Post
      </Button>

      <AddPost open={addPost} />
    </Paper>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    marginTop: 50,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(1, 0.5)
  },
  button: {
		borderRadius: 0
	}
}));


export default SortOptions
