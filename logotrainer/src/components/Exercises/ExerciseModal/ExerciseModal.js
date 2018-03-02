import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header, Button, Form, Label, Icon } from "semantic-ui-react";
import { removeExerciseFromModal } from "../../../actions/exerciseInModal";
import SelectSkillRow from "../SelectSkillRow";
import {
  addExerciseAsync,
  updateExerciseAsync,
  removeExerciseAsync
} from "../../../actions/exerciseList";

class ExerciseModal extends Component {
  state = {
    ...this.props.exerciseInModal
  };

  onExercisePropertyChange = ev => {
    let name = ev.target.getAttribute("name");
    let value = ev.target.value;
    this.setState({
      ...this.state,
      [name]: value
    });
  };

  addSecondarySkillHandler = () => {
    let exerciseToState = { ...this.state };
    exerciseToState.exerciseSecondarySkills.push(
      this.props.skills[0].skills[0].skillId
    );
    this.setState(exerciseToState);
  };

  removeSecondarySkillHandler = () => {
    let filteredSkills = this.state.exerciseSecondarySkills.slice(0, -1);
    this.setState({
      ...this.state,
      exerciseSecondarySkills: [...filteredSkills]
    });
  };

  updateSecondarySkillHandler = (skillId, index) => {
    let secSkills = [...this.state.exerciseSecondarySkills];
    secSkills[index] = skillId;
    this.setState({
      ...this.state,
      exerciseSecondarySkills: [...secSkills]
    });
  };

  updateMainLevel = levelId => {
    this.setState({
      ...this.state,
      exerciseMainLevelId: levelId
    });
  };

  updateMainSkillHandler = skillId => {
    this.setState({
      ...this.state,
      exerciseMainSkillId: skillId,
      exerciseMainLevelId: this.props.skills[0].skills[0].skillLevels[0].levelId
    });
  };

  addUpdateExerciseBtnHandler = () => {
    this.state.exerciseId === undefined
      ? this.props.addExerciseAsync(this.state)
      : this.props.updateExerciseAsync(this.state);
  };

  render() {
    let legend =
      this.state.exerciseId === undefined
        ? "Добавить упражнение"
        : "Редактировать упражнение";
    let btnLabel =
      this.state.exerciseId === undefined ? "Добавить" : "Сохранить";
    return (
      <Modal
        onClose={this.props.removeExerciseFromModal}
        open={Boolean(this.props.exerciseInModal)}
        closeIcon
      >
        <Header icon="sign language" color="green" content={legend} />
        <Modal.Content scrolling>
          <Form>
            <Form.Input
              type="text"
              placeholder="Название упражнения"
              label="Название упражнения"
              required
              name="exerciseName"
              onChange={this.onExercisePropertyChange}
              defaultValue={this.state.exerciseName}
            />
            <Form.TextArea
              rows="2"
              type="text"
              placeholder="Инвентарь"
              label="Инвентарь"
              name="exerciseInventory"
              onChange={this.onExercisePropertyChange}
              required
              defaultValue={this.state.exerciseInventory}
            />
            <Form.TextArea
              rows="8"
              type="text"
              placeholder="Методика"
              label="Методика"
              name="exerciseSteps"
              onChange={this.onExercisePropertyChange}
              required
              defaultValue={this.state.exerciseSteps}
            />

            <Label tag color="green">
              Основной навык
            </Label>
            {
              <SelectSkillRow
                isMain={true}
                skillId={this.state.exerciseMainSkillId}
                levelId={this.state.exerciseMainLevelId}
                updateMainLevel={this.updateMainLevel}
                updateSecondarySkill={this.updateMainSkillHandler}
              />
            }
            <Label tag color="olive">
              Дополнительные навыки
            </Label>
            <Icon
              name="add"
              color="olive"
              size="big"
              onClick={this.addSecondarySkillHandler}
            />
            {this.state.exerciseSecondarySkills.length !== 0 &&
              this.state.exerciseSecondarySkills.map((item, index) => (
                <SelectSkillRow
                  skillId={item}
                  key={index}
                  index={index}
                  isLast={
                    index == this.state.exerciseSecondarySkills.length - 1
                  }
                  removeSecondarySkill={this.removeSecondarySkillHandler}
                  updateSecondarySkill={this.updateSecondarySkillHandler}
                />
              ))}
          </Form>
        </Modal.Content>
        {this.state.exerciseId !== undefined && (
          <Button
            color="red"
            onClick={() => this.props.removeExerciseAsync(this.state)}
          >
            Удалить
          </Button>
        )}
        <Button
          className="ui right floated button"
          color="green"
          onClick={this.addUpdateExerciseBtnHandler}
        >
          {btnLabel}
        </Button>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  exerciseInModal: state.exerciseInModal,
  skills: state.skills
});

const mapDispatchToProps = {
  removeExerciseFromModal,
  addExerciseAsync,
  updateExerciseAsync,
  removeExerciseAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseModal);
