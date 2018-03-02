import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { addExerciseToModal } from "../../actions/exerciseInModal";
import ExerciseModal from "./ExerciseModal";
import ExerciseSearchForm from "./ExerciseSearchForm";
import ExerciseList from "./ExerciseList";

class Exercises extends Component {
  render() {
    return (
      <div>
        <Button
          color="olive"
          onClick={() =>
            this.props.addExerciseToModal({
              exerciseSecondarySkills: [],
              exerciseMainSkillId: this.props.skills[0].skills[0].skillId
            })
          }
        >
          <Icon name="add" size="big" /> Добавить упражнение
        </Button>
        <ExerciseSearchForm />
        <ExerciseList />
        {this.props.exerciseInModal == null ? null : <ExerciseModal />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  exerciseInModal: state.exerciseInModal,
  skills: state.skills
});

const mapDispatchToProps = {
  addExerciseToModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Exercises);
