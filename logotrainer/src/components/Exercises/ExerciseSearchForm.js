import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Segment } from "semantic-ui-react";
import { getExerciseListAsync } from "../../actions/exerciseList";
import SelectSkillRow from "./SelectSkillRow";
import { updateFilter } from "../../actions/exerciseFilter";

class ExerciseSearchForm extends Component {
  render() {
    return (
      <Segment>
        <Form>
          <SelectSkillRow
            isMain={true}
            skillId={this.props.exerciseFilter.mainSkillId}
            levelId={this.props.exerciseFilter.mainLevelId}
            updateMainLevel={levelId =>
              this.props.updateFilter({
                mainSkillId: this.props.exerciseFilter.mainSkillId,
                mainLevelId: levelId
              })
            }
            updateSecondarySkill={skillId =>
              this.props.updateFilter({
                mainSkillId: skillId,
                mainLevelId: this.props.skills
                  .find(
                    skillgroup =>
                      skillgroup.skills.find(
                        skill => skill.skillId === skillId
                      ) !== undefined
                  )
                  .skills.find(skill => skill.skillId === skillId)
                  .skillLevels[0].levelId
              })
            }
          />

          <Button
            onClick={() =>
              this.props.getExerciseListAsync(this.props.exerciseFilter)
            }
          >
            Поиск
          </Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  exerciseFilter: state.exerciseFilter,
  skills: state.skills
});

const mapDispatchToProps = {
  getExerciseListAsync,
  updateFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSearchForm);
