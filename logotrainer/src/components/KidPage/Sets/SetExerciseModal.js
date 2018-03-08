import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import { removeSetExerciseList } from "../../../actions/setExerciseList";

class SetExerciseModal extends Component {
  render() {
    return (
      <Modal
        onClose={this.props.removeSetExerciseList}
        open={Boolean(this.props.setExerciseList)}
        closeIcon
      >
        hello
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  setExerciseList: state.setExerciseList,
  kidInPage: state.kidInPage
});

const mapDispatchToProps = {
  removeSetExerciseList
};

export default connect(mapStateToProps, mapDispatchToProps)(SetExerciseModal);
