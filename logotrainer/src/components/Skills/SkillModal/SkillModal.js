import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Form, Message, Icon } from "semantic-ui-react";
import { removeSkillModal } from "../../../actions/skillInModal";
import LevelForm from "./LevelForm";
import {
  addSkillAsync as addSkill,
  updateSkillAsync as updateSkill,
  removeSkillAsync as removeSkill
} from "../../../actions/skills";
import { v4 as guid } from "uuid";

class SkillModal extends Component {
  state = {
    skillInModal: { ...this.props.skillInModal },
    error: false
  };

  addLevelBtnHandler = () => {
    const { skillInModal } = this.state;
    let levels = [...skillInModal.skillLevels, { levelId: guid() }];
    let theSkill = { ...skillInModal, skillLevels: levels };
    this.setState({
      skillInModal: theSkill
    });
  };

  removeLevelBtnHandler = ev => {
    let levelIdToRemove = ev.target.parentNode.getAttribute("levelid");
    let skillToOperate = { ...this.state.skillInModal };
    skillToOperate.skillLevels = skillToOperate.skillLevels.filter(
      level => level.levelId != levelIdToRemove
    );
    this.setState({
      skillInModal: skillToOperate
    });
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
    if (this.containsInvalidData()) return;
    const {
      skillInModal: { skillId: ownSkillId } = {},
      removeSkillModal,
      addSkill,
      updateSkill,
      groupid: skillGroupId
    } = this.props;
    const isNew = ownSkillId === undefined;
    const { skillInModal: skill } = this.state;
    if (isNew)
      addSkill({
        skillGroupId,
        skill
      });
    else
      updateSkill({
        skillGroupId,
        skill
      });
    removeSkillModal();
  };

  containsInvalidData = () => {
    const {
      skillInModal: { skillName, skillQuestion, skillLevels }
    } = this.state;
    if (
      skillName &&
      skillName.trim() &&
      skillQuestion &&
      skillQuestion.trim() &&
      skillLevels.every(
        level =>
          level.levelNumber <= 100 &&
          level.levelNumber >= 0 &&
          level.levelText &&
          level.levelText.trim()
      )
    ) {
      return false;
    } else {
      this.setState({ error: true });
      return true;
    }
  };

  render() {
    const {
      skillInModal: { skillId: ownSkillId } = {},
      removeSkillModal
    } = this.props;
    const isNew = ownSkillId === undefined;
    let legend = isNew ? "Добавить навык" : "Редактировать навык";
    let btnLabel = isNew ? "Добавить" : "Сохранить";
    const {
      skillInModal: { skillName = "", skillQuestion = "", skillLevels },
      error
    } = this.state;
    return (
      <Modal onClose={removeSkillModal} open closeIcon>
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
              defaultValue={skillName}
            />

            <Form.Input
              type="text"
              placeholder="Вопрос для теста"
              label="Вопрос для теста"
              name="skillQuestion"
              onChange={this.onSkillPropertyChange}
              required
              defaultValue={skillQuestion}
            />
            {skillLevels != null &&
              skillLevels.map(item => (
                <LevelForm
                  level={item}
                  key={item.levelId}
                  removeLevelBtnHandler={this.removeLevelBtnHandler}
                  onLevelPropertyChange={this.onLevelPropertyChange}
                  canBeRemoved={skillLevels.length > 1}
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
          {error && (
            <Message negative>
              Пожалуйста, заполните все обязательные поля (обозначены *)
            </Message>
          )}
          {!isNew && (
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
