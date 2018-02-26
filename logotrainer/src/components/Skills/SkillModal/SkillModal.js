import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "semantic-ui-react";
import { removeSkillModal } from "../../../actions/skillInModal";

class SkillModal extends Component {
  render() {
    return (
      <Modal
        onClose={this.props.removeSkillModal}
        open={Boolean(this.props.skillInModal)}
        closeIcon
      >
        Skill Modal
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  skillInModal: state.skillInModal
});

const mapDispatchToProps = {
  removeSkillModal
};

export default connect (mapStateToProps, mapDispatchToProps) (SkillModal);
