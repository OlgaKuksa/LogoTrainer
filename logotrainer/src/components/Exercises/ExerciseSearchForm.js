import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Button, Segment } from "semantic-ui-react";
import { getExerciseListAsync } from "../../actions/exerciseList";
import SelectSkillRow from "./SelectSkillRow";

class ExerciseSearchForm extends Component {
  updateMainLevel = () => {
    return;
  };

  updateSecondarySkill = () => {
    return;
  };

  render() {
    return (
      <Segment>
        <Form>
          <SelectSkillRow
            isMain={true}
            skillId={this.props.skills[0].skills[0].skillId}
            updateMainLevel={this.updateMainLevel}
            updateSecondarySkill={this.updateSecondarySkill}
          />

          <Button onClick={this.props.getExerciseListAsync}>Поиск</Button>
        </Form>
      </Segment>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.skills
});

const mapDispatchToProps = {
  getExerciseListAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSearchForm);
