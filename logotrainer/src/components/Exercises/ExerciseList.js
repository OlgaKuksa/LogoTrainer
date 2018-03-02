import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Icon } from "semantic-ui-react";
import { addExerciseToModal } from "../../actions/exerciseInModal";

class ExerciseList extends Component {
  render() {
    return (
      <Card.Group>
        {this.props.exerciseList.map(exercise => (
          <Card key={exercise.exerciseId}>
            <Card.Content>
              <Card.Header>{exercise.exerciseName}</Card.Header>

              {"Основной навык: " +
                this.props.skills
                  .find(
                    group =>
                      group.skills.find(
                        skill => skill.skillId === exercise.exerciseMainSkillId
                      ) !== undefined
                  )
                  .skills.find(
                    skill => skill.skillId === exercise.exerciseMainSkillId
                  ).skillName}
            </Card.Content>
            <Icon
              name="edit"
              color="olive"
              size="large"
              onClick={() => this.props.addExerciseToModal(exercise)}
            />
          </Card>
        ))}
      </Card.Group>
    );
  }
}

const mapStateToProps = state => ({
  exerciseList: state.exerciseList,
  skills: state.skills
});

const mapDispatchToProps = {
  addExerciseToModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseList);
