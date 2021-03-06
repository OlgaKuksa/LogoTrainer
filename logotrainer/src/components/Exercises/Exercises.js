import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, Message } from "semantic-ui-react";
import { addExerciseToModal } from "../../actions/exerciseInModal";
import ExerciseModal from "./ExerciseModal";
import ExerciseSearchForm from "./ExerciseSearchForm";
import ExerciseList from "./ExerciseList";

class Exercises extends Component {
  render() {
    return (
      <div>
        {this.props.skills.filter(skillgroup => skillgroup.skills.length > 0)
          .length > 0 ? (
          <div>
            <Button
              color="olive"
              onClick={() =>
                this.props.addExerciseToModal({
                  exerciseSecondarySkills: [],
                  exerciseMainSkillId: this.props.skills.find(
                    skillgroup => skillgroup.skills.length > 0
                  ).skills[0].skillId,
                  exerciseMainLevelId: this.props.skills.find(
                    skillgroup => skillgroup.skills.length > 0
                  ).skills[0].skillLevels[0].levelId
                })
              }
            >
              <Icon name="add" size="big" /> Добавить упражнение
            </Button>
            <ExerciseSearchForm />
            {this.props.exerciseList === null ? null : <ExerciseList />}
            {this.props.exerciseInModal == null ? null : <ExerciseModal />}
          </div>
        ) : (
          <Message compact color="olive">
            <Icon name="warning circle" />
            Работа с упражнениями возможна после добавления хотя бы одного
            навыка
          </Message>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  exerciseInModal: state.exerciseInModal,
  skills: state.skills,
  exerciseList: state.exerciseList
});

const mapDispatchToProps = {
  addExerciseToModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
