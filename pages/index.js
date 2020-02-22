import React, { Component } from 'react';
import Home from "../src/containers/Home";
import { config } from "../config";
import axios from "axios";
import { connect } from "react-redux";
import { setTopics, setCurrentPage, setToken, setUserData } from "../src/store/actions"
import BottomScrollListerer from "react-bottom-scroll-listener";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Container } from '@material-ui/core';


const mapDispatchToProps = {
  setTopics,
  setCurrentPage,
  setUserData,
  setToken
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
    topics: state.topics
  };
}


class HomePage extends Component {
  static async getInitialProps(context) {
    const { req, res } = context;
    try {
      const topics = await axios.get(config.topics);

      return {
        firstTopics: topics.data
      };
    } catch (error) {
      console.log("error", error);
    }
  }


  constructor(props) {
    super(props);
    
    this.clear = null;

    this.state = {
      loading: false
    }
  }
  


  componentDidMount() {
    const { setTopics, firstTopics } = this.props;

    this.handleGetUser();

    setTopics(firstTopics);

    // this.clear = setInterval(async() => {
    //   this.handleFetchMore();
    // }, 3000);
  }


  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.topics.currentPage > 3) {
  //     clearInterval(this.clear);
  //   }
  // }


  // handleSetToken = () => {
  //   const { setToken } = this.props;

  //   const token = localStorage.getItem("token");
  //   setToken(token);
  // }


  handleGetUser = async () => {
    try {
      const { setToken, setUserData } = this.props;

      const token = localStorage.getItem("token");
      if (token) {
        const user = await axios.get(config.me, {
          headers: { "x-auth-token": token }
        });

        setUserData(user.data);
        sessionStorage.setItem("userData", user.data);
      }

    setToken(token);
    } catch (error) {
      console.log("error", error);
    }
  }
  


  componentWillUnmount() {
    clearInterval(this.clear)
  }


  handleFetchMore = async() => {
    const { topics, setCurrentPage, setTopics } = this.props;
    const { loading } = this.state;

    if (loading) return;

    this.setState({
      loading: true
    });

    const page = Number(topics.currentPage) + 1;
    try {
      const nextTopics = await axios.get(config.topics + "?page=" + page);

      nextTopics.data.topics.forEach(element => {
        topics.topics.push(element);
      });
      topics.page = nextTopics.data.topics.page;
      topics.total = nextTopics.data.topics.total;

      setTopics(topics);
      setCurrentPage(page);
      this.setState({
        loading: false
      });
    } catch (error) {
      console.log("errorerror", error);
      this.setState({
        loading: false
      });
    }
  }



  render() {
    const { loading } = this.state;
    return (
      <BottomScrollListerer onBottom={this.handleFetchMore}>
        <Home />
        {loading && (
          <Container maxWidth="xs">
            <CircularProgress />
          </Container>
        )}
      </BottomScrollListerer>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomePage);