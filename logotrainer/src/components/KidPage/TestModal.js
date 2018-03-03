import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "semantic-ui-react";
import { removeTestModal } from "../../actions/testInModal";

class TestModal extends Component {
  render() {
    return (
      <Modal
        onClose={this.props.removeTestModal}
        open={Boolean(this.props.testInModal)}
        closeIcon
      >
        <Modal.Header>Оценка навыков ребенка</Modal.Header>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  testInModal: state.testInModal
});

const mapDispatchToProps = {
  removeTestModal
};

export default connect(mapStateToProps, mapDispatchToProps)(TestModal);
