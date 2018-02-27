import React, { Component } from "react";
import Kids from "../Kids";
import KidPage from "../KidPage";
import { connect } from "react-redux";

class KidsWrapper extends Component {
  render() {
    return <div>{this.props.kidInPage ? <KidPage /> : <Kids />}</div>;
  }
}

const mapStateToProps = state => ({
  kidInPage: state.kidInPage
});

export default connect(mapStateToProps, undefined)(KidsWrapper);
