import React, { Component } from 'react';
import TopicContainer from "../src/containers/Topic";
import { connect } from "react-redux";
import {
  setSingleTopic,
  setCurrentPage,
  setUserData,
  setToken,
  setComment
} from "../src/store/actions";
import axios from "axios";
import { config } from "../config";



const mapDispatchToProps = {
  setSingleTopic,
  setCurrentPage,
  setUserData,
  setToken,
  setComment
};

class Topic extends Component {
  static async getInitialProps(context) {
    const { req, res, query } = context;
    try {
      const topics = await axios.get(config.topics + "/" + query.topicId);

      const comments = await axios.get(config.comment + "/" + query.topicId);

      return {
        topic: topics.data,
        comments: comments.data
      };
    } catch (error) {
      console.log("error", error);
      if (res) {
        res.writeHead(404, {
          Location: "/"
        });
        res.end();
      } else {
        Router.push("/");
      }
    }
  }

  componentDidMount() {
    const { setSingleTopic, topic, setComment, comments } = this.props;

    this.handleGetUser();

    setSingleTopic(topic);
    setComment(comments);
  }

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
  };

  render() {
    return <TopicContainer />;
  }
}

export default connect(null, mapDispatchToProps)(Topic);