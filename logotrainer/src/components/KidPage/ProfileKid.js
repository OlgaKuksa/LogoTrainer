import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import TestModal from "./TestModal";
import { addTestModal } from "../../actions/testInModal";

class ProfileKid extends Component {
  render() {
    return (
      <div>
        <Button onClick={() => this.props.addTestModal({})}>Пройти тест</Button>
        {this.props.testInModal !== null ? <TestModal /> : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testInModal: state.testInModal
});

const mapDispatchToProps = {
  addTestModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileKid);
