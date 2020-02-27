import React from "react";
import Grid from "@material-ui/core/Grid";
import AdvertBoard from "../../../components/AdvertBoard";
import Container from "@material-ui/core/Container";
import ClassicCard from '../../../components/ClassicCard';
import { connect } from "react-redux";
import EmbedSite from "../../../components/EmbedSite";
import Action from "../../../components/EmbedSite/components/Action";
import SectionHeader from "./SectionHeader";
import Conversation from "./Conversation";
import Gif from "../../../components/EmbedSite/components/Gif";


const mapStateToProps = (state) => {
  return {
    topics: state.topics
  }
}


function Layout(props) {
  const { topics } = props;

  // console.log("Router.router", Router.router);
  
	return (
    <Container maxWidth="md">
      {topics.singleTopic && <EmbedSite topic={topics.singleTopic} />}

      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={12} md={8} align="center">
          {topics.singleTopic && (
            <>
              {topics.singleTopic.type === "gif" && (
                <Gif url={topics.singleTopic.url} />
              )}
              <Action
                topicId={topics.singleTopic._id}
                userId={topics.singleTopic.userId}
                votesCount={topics.singleTopic.votesCount}
                commentsCount={topics.singleTopic.commentsCount}
              />
            </>
          )}
          <SectionHeader />
          <Conversation />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <AdvertBoard />
        </Grid>
      </Grid>
    </Container>
  );
}


export default connect(mapStateToProps)(Layout);