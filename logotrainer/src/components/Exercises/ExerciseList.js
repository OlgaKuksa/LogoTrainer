import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Header } from "semantic-ui-react";

class ExerciseList extends Component {
  render() {
    return (
      <Card.Group>
        {this.props.exerciseList.map(exercise => (
          <Card>
            <Card.Header>{exercise.exerciseName}</Card.Header>
            <Card.Content>
              Основной навык:
              {
                this.props.skills
                  .find(
                    group =>
                      group.skills.find(
                        skill => skill.skillId === exercise.exerciseMainSkillId
                      ) !== undefined
                  )
                  .skills.find(
                    skill => skill.skillId === exercise.exerciseMainSkillId
                  ).skillName
              }
            </Card.Content>
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

export default connect(mapStateToProps, undefined)(ExerciseList);
