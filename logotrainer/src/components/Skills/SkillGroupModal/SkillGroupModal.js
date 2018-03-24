import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Form } from "semantic-ui-react";
import { removeSkillGroupModal } from "../../../actions/skillGroupInModal";
import {
  addSkillGroupAsync as addSkillGroup,
  updateSkillGroupAsync as updateSkillGroup,
  removeSkillGroupAsync as removeSkillGroup
} from "../../../actions/skills";
import "../../Logotrainer/Logotrainer.css";

class SkillGroupModal extends Component {
  state = {
    skillGroup: { ...this.props.skillGroupInModal }
  };

  changeGroupNameHandler = ev => {
    let newGroupName = ev.target.value;
    this.setState(prevState => ({
      skillGroup: {
        ...prevState.skillGroup,
        skillGroupName: newGroupName
      }
    }));
  };

  addUpdateBtnHandler = () => {
    this.props.skillGroupInModal.skillGroupId === undefined
      ? this.props.addSkillGroup(this.state.skillGroup)
      : this.props.updateSkillGroup(this.state.skillGroup);
    this.props.removeSkillGroupModal();
  };

  removeBtnHandler = () => {
    if (this.state.skillGroup.skills.length !== 0) return;
    this.props.removeSkillGroup(this.state.skillGroup);
    this.props.removeSkillGroupModal();
  };
  render() {
    let btnLabel =
      Object.getOwnPropertyNames(this.props.skillGroupInModal).length === 0
        ? "Добавить"
        : "Сохранить";
    return (
      <Modal
        onClose={this.props.removeSkillGroupModal}
        open={Boolean(this.props.skillGroupInModal)}
        closeIcon
      >
        <Modal.Header>Группа навыков</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Input
              type="text"
              placeholder="Название группы"
              label="Название группы навыков"
              required
              defaultValue={
                this.props.skillGroupInModal.skillGroupName == undefined
                  ? ""
                  : this.props.skillGroupInModal.skillGroupName
              }
              onChange={this.changeGroupNameHandler}
            />
            <Modal.Actions>
              {Object.getOwnPropertyNames(this.props.skillGroupInModal)
                .length != 0 &&
                this.props.skillGroupInModal.skills.length === 0 && (
                  <Button color="red" onClick={this.removeBtnHandler}>
                    Удалить
                  </Button>
                )}
              <Button color="green" onClick={this.addUpdateBtnHandler}>
                {btnLabel}
              </Button>
            </Modal.Actions>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  skillGroupInModal: state.skillGroupInModal
});

const mapDispatchToProps = {
  removeSkillGroupModal,
  addSkillGroup,
  updateSkillGroup,
  removeSkillGroup
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillGroupModal);
