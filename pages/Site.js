import React, { Component } from 'react';
import SiteContainer from "../src/containers/Site";
import { connect } from "react-redux";
import {
  setTopicForSite,
  setUserData,
  setToken,
  setSite
} from "../src/store/actions";
import axios from "axios";
import { config } from "../config";



const mapDispatchToProps = {
  setTopicForSite,
  setUserData,
  setToken,
  setSite
};

class Site extends Component {
  static async getInitialProps(context) {
    const { req, res, query } = context;
    try {

      if (typeof query.s === "undefined") {
        res.writeHead(404, {
          Location: "/"
        });
      }

      if (query.s === "") {
        res.writeHead(404, {
          Location: "/"
        });
      }

      const site = await axios.post(config.site, { url: query.s });

      console.log("site.data", site.data);
      
      const topics = await axios.get(
        config.siteTopics + "?s=" + query.s
      );

      return {
        site: site.data,
        topics: topics.data
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
    const { setSite, site, setTopicForSite, topics } = this.props;

    this.handleGetUser();

    setTopicForSite(topics);
    setSite(site);
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
    return <SiteContainer />;
  }
}

export default connect(null, mapDispatchToProps)(Site);