import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Form, Message, Icon } from "semantic-ui-react";
import { removeSkillModal } from "../../../actions/skillInModal";
import LevelForm from "./LevelForm";
import skillInModal from "../../../reducers/skillInModal";

class SkillModal extends Component {
  state = {
    skillInModal: { ...this.props.skillInModal }
  };

  addLevelBtnHandler = () => {
    const guid = require("uuid/v4");
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

  render() {
    let legend =
      Object.getOwnPropertyNames(this.props.skillInModal).length === 0
        ? "Добавить навык"
        : "Редактировать навык";
    let btnLabel =
      Object.getOwnPropertyNames(this.props.skillInModal).length === 0
        ? "Добавить"
        : "Сохранить";

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
          {Object.getOwnPropertyNames(this.state.skillInModal).length !== 0 && (
            <Button color="red">Удалить</Button>
          )}
          <Button color="green" className="ui right floated button">
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
  removeSkillModal
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillModal);
