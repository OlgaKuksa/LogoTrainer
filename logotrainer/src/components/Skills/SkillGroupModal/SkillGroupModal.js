import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Form } from "semantic-ui-react";
import { removeSkillGroupModal } from "../../../actions/skillGroupInModal";
import { addSkillGroup, updateSkillGroup } from "../../../actions/skills";

class SkillGroupModal extends Component {
  state = {
    skillGroup: this.props.skillGroupInModal
  };

  changeGroupNameBtnHandler = ev => {
    this.setState({ skillGroup: { skillGroupName: ev.target.value } });
  };

  addUpdateBtnHandler = () => {
    Object.getOwnPropertyNames(this.props.skillGroupInModal).length === 0
      ? this.props.addSkillGroup(this.state.skillGroup)
      : this.props.updateSkillGroup(this.state.skillGroup);
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
              defaultValue={
                this.props.skillGroupInModal.skillGroupName == undefined
                  ? ""
                  : this.props.skillGroupInModal.skillGroupName
              }
              onChange={this.changeGroupNameBtnHandler}
            />
            <Modal.Actions>
              {Object.getOwnPropertyNames(this.props.skillGroupInModal)
                .length != 0 && (
                <Button color="red" onSubmit={this.addUpdateBtnHandler}>
                  Удалить
                </Button>
              )}
              <Button color="green" onSubmit={this.addUpdateBtnHandler} className="ui right floated button">
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
  removeSkillGroupModal
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillGroupModal);
