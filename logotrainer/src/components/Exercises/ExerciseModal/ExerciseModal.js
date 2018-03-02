import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header, Button, Form, Label, Icon } from "semantic-ui-react";
import { removeExerciseFromModal } from "../../../actions/exerciseInModal";
import SelectSkillRow from "../SelectSkillRow";

class ExerciseModal extends Component {
  state = {
    ...this.props.exerciseInModal
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

  render() {
    let legend =
      Object.getOwnPropertyNames(this.props.exerciseInModal).length === 0
        ? "Добавить упражнение"
        : "Редактировать упражнение";
    let btnLabel =
      Object.getOwnPropertyNames(this.props.exerciseInModal).length === 0
        ? "Добавить"
        : "Сохранить";
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
            />
            <Form.TextArea
              rows="2"
              type="text"
              placeholder="Инвентарь"
              label="Инвентарь"
              name="exerciseInventory"
            />
            <Form.TextArea
              rows="8"
              type="text"
              placeholder="Методика"
              label="Методика"
              name="exerciseSteps"
              required
            />

            <Label tag color="green">
              Основной навык
            </Label>
            {
              <SelectSkillRow
                isMain={true}
                skillId={this.state.exerciseMainSkillId}
                levelId={this.state.exerciseMainLevelId}
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
        <Button className="ui right floated button" color="green">
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
  removeExerciseFromModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseModal);
