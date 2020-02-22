import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ThumbNails from "../../ThumbNails";
import Options from "./Options";
import moment from "moment";
import Image from "./Image";
import Gif from "./Gif";
import Site from "./Site";
import Vote from "./Vote";
import { toggleGift } from "../../../store/actions";
import { connect } from "react-redux";
import Favourite from "./Favourite";
import Comments from "./Comment";
import Youtube from "./Youtube";


const mapDispatchToProps = {
  toggleGift
};

const CardRoot = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const { topic, toggleGift } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleRenderObject = (type) => {
    if (type === "gif") {
      return <Gif url={topic.url} />;
    } else if (type === "image") {
      return <Image url={topic.url} />;
    } else if (type === "site") {
      return <Site url={topic.url} />;
    } else if (type === "youtube") {
      return <Youtube videoId={topic.youtubeId} />
    }
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <ThumbNails
            name={topic.userId ? topic.userId.username : "Anonymous"}
          />
        }
        action={<Options />}
        component="div"
        classes={{
          content: classes.title
        }}
        title={
          <>
            @
            <Typography
              align="left"
              color="primary"
              component="a"
              href="/profile"
            >
              {topic.userId ? topic.userId.username : "Anonymous"}
            </Typography>
          </>
        }
        subheader={moment(topic.createdAt).fromNow()}
      />
      <CardContent>
        <Typography variant="h6" color="textPrimary" component="a" align="left">
          {topic.title}
        </Typography>
      </CardContent>
      {handleRenderObject(topic.type)}
      <CardContent>
        <Typography
          variant="body2"
          color="textSecondary"
          component="a"
          align="left"
        >
          {topic.url}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Vote count={topic.votesCount} topicId={topic._id} />

        <Favourite topicId={topic._id} />

        <Comments count={topic.commentsCount} />

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="Share" onClick={() => toggleGift()}>
          <img
            src="/static/icons/moneybag.svg"
            alt="comments"
            width="25"
            height="25"
            style={{ color: "#1F7BD8" }}
          />
        </IconButton>
        {/* <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 500,
    margin: theme.spacing(2, .5),
    "&:hover": {
      boxShadow: "0 4px 20px 0 rgba(0,0,0,0.12)",
      // transform: "scale(1.04)"
      transform: "scale(1.01)"
    }
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  title: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flexDirection: "column"
  }
}));


export default connect(null, mapDispatchToProps)(CardRoot)