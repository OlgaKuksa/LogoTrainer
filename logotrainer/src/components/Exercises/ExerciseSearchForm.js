import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "semantic-ui-react";
import { getExerciseListAsync } from "../../actions/exerciseList";

class ExerciseSearchForm extends Component {
  render() {
    return (
      <div>
        <Button onClick={this.props.getExerciseListAsync}>Поиск</Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  getExerciseListAsync
};

export default connect(undefined, mapDispatchToProps)(ExerciseSearchForm);
