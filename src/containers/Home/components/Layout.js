import React from "react";
import Grid from "@material-ui/core/Grid";
// import RegularPost from "../../../components/RegularPost";
import AdvertBoard from "../../../components/AdvertBoard";
import Container from "@material-ui/core/Container";
import ProfileCard from '../../../components/ProfileCard';
import TopHashtag from './TopHashtag';
import Leaderboard from './LeaderBoard';
import ImageCard from '../../../components/ImagePost/components/ImageCard';
import ClassicCard from '../../../components/ClassicCard';
import { connect } from "react-redux";
import SearchInput from "../../../components/SearchInput";
import SortOptions from "../../../components/SortOptions";
import Router from "next/router";
import { Hidden } from "@material-ui/core";


const mapStateToProps = (state) => {
  return {
    topics: state.topics
  }
}


function Layout(props) {
  const { topics } = props;

  // console.log("Router.router", Router.router);
  
	return (
    <Container maxWidth="md" style={{ marginTop: 50 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} justify="center" align="center">
          <Hidden smUp>
            <TopHashtag />
            <AdvertBoard />
          </Hidden>

          {Router.router && (
            <SortOptions
              disabled={Router.router.asPath === "/" ? "Popular" : "Recent"}
            />
          )}

          {topics.topics.map((topic, index) => (
            <ClassicCard key={index} topic={topic} />
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          {/* <ProfileCard /> */}
          {/* <SearchInput /> */}
          <Hidden smDown>
            <TopHashtag />
            <AdvertBoard />
          </Hidden>

          <Leaderboard />
        </Grid>
      </Grid>
    </Container>
  );
}


export default connect(mapStateToProps)(Layout);