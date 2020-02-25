import React from "react";
import Header from '../../components/Header'
import Layout from './components/Layout';
import GiftModal from "../../components/GiftModal";
import { connect } from "react-redux";


const mapStateToProps = state => ({
	user: state.user
})

function HomeComtainer(props) {
	const { user } = props;
	return (
    <div>
      <Header />
      <Layout />

      {/* check if the user data is availabe on redux */}
      {user.user && <GiftModal />}
    </div>
  );
}


export default connect(mapStateToProps)(HomeComtainer)