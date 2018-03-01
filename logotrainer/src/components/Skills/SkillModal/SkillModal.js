import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Form, Message, Icon } from "semantic-ui-react";
import { removeSkillModal } from "../../../actions/skillInModal";
import LevelForm from "./LevelForm";
import { addSkill, updateSkill, removeSkill } from "../../../actions/skills";
import { v4 as guid } from "uuid";

class SkillModal extends Component {
  state = {
    skillInModal: { ...this.props.skillInModal }
  };

  addLevelBtnHandler = () => {
    let levels = [...this.state.skillInModal.skillLevels, { levelId: guid() }];
    let theSkill = { ...this.state.skillInModal };
    theSkill.skillLevels = [...levels];
    this.setState({ skillInModal: theSkill });
  };

  removeLevelBtnHandler = ev => {
    let levelIdToRemove = ev.target.parentNode.getAttribute("levelid");
    let skillToOperate = { ...this.state.skillInModal };
    skillToOperate.skillLevels = skillToOperate.skillLevels.filter(
      level => level.levelId != levelIdToRemove
    );
    this.setState({ skillInModal: skillToOperate });
  };

  onSkillPropertyChange = ev => {
    let name = ev.target.getAttribute("name");
    let value = ev.target.value;
    this.setState(prevState => ({
      skillInModal: {
        ...prevState.skillInModal,
        [name]: value
      }
    }));
  };

  onLevelPropertyChange = ev => {
    let levelIdToEdit = ev.target.parentNode.parentNode.parentNode.getAttribute(
      "levelid"
    );
    let name = ev.target.getAttribute("name");
    let value = ev.target.value;
    this.setState(prevState => ({
      skillInModal: {
        ...prevState.skillInModal,
        skillLevels: prevState.skillInModal.skillLevels.map(
          level =>
            level.levelId != levelIdToEdit ? level : { ...level, [name]: value }
        )
      }
    }));
  };

  removeSkillBtnHandler = () => {
    this.props.removeSkill({
      skillGroupId: this.props.groupid,
      skillId: this.state.skillInModal.skillId
    });
    this.props.removeSkillModal();
  };

  addUpdateSkillBtnHandler = () => {
    this.props.skillInModal.skillId === undefined
      ? this.props.addSkill({
          skillGroupId: this.props.groupid,
          skill: this.state.skillInModal
        })
      : this.props.updateSkill({
          skillGroupId: this.props.groupid,
          skill: this.state.skillInModal
        });
    this.props.removeSkillModal();
  };

  render() {
    let legend =
      this.props.skillInModal.skillId === undefined
        ? "Добавить навык"
        : "Редактировать навык";
    let btnLabel =
      this.props.skillInModal.skillId === undefined ? "Добавить" : "Сохранить";

    return (
      <Modal
        onClose={() => {
          this.props.removeSkillModal();
          this.setState(this.props.skillInModal);
        }}
        open={Boolean(this.props.skillInModal)}
        closeIcon
      >
        <Modal.Header>{legend}</Modal.Header>
        <Modal.Content scrolling>
          <Form>
            <Form.Input
              type="text"
              placeholder="Название навыка"
              label="Название навыка"
              required
              name="skillName"
              onChange={this.onSkillPropertyChange}
              defaultValue={
                this.state.skillInModal.skillName == undefined
                  ? ""
                  : this.state.skillInModal.skillName
              }
            />

            <Form.Input
              type="text"
              placeholder="Вопрос для теста"
              label="Вопрос для теста"
              name="skillQuestion"
              onChange={this.onSkillPropertyChange}
              required
              defaultValue={
                this.state.skillInModal.skillQuestion == undefined
                  ? ""
                  : this.state.skillInModal.skillQuestion
              }
            />
            {this.state.skillInModal.skillLevels !== undefined &&
              this.state.skillInModal.skillLevels.map(item => (
                <LevelForm
                  level={item}
                  key={item.levelId}
                  removeLevelBtnHandler={this.removeLevelBtnHandler}
                  onLevelPropertyChange={this.onLevelPropertyChange}
                />
              ))}
            <Icon
              name="add circle"
              color="olive"
              size="big"
              onClick={this.addLevelBtnHandler}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          {this.props.skillInModal.skillId !== undefined && (
            <Button color="red" onClick={this.removeSkillBtnHandler}>
              Удалить
            </Button>
          )}
          <Button
            color="green"
            className="ui right floated button"
            onClick={this.addUpdateSkillBtnHandler}
          >
            {btnLabel}
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  skillInModal: state.skillInModal
});

const mapDispatchToProps = {
  removeSkillModal,
  addSkill,
  updateSkill,
  removeSkill
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillModal);
