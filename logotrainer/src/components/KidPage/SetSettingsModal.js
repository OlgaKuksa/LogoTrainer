import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal } from "semantic-ui-react";
import { removeSetSettingsModal } from "../../actions/setSettingsInModal";

class SetSettingsModal extends Component {
  render() {
    return (
      <Modal
        onClose={this.props.removeSetSettingsModal}
        open={Boolean(this.props.setSettingsInModal)}
        closeIcon
      >
        test modal
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  setSettingsInModal: state.setSettingsInModal
});

const mapDispatchToProps = {
  removeSetSettingsModal
};

export default connect(mapStateToProps, mapDispatchToProps)(SetSettingsModal);
