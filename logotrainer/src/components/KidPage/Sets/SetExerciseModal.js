import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header, Segment } from "semantic-ui-react";
import { removeSetExerciseList } from "../../../actions/setExerciseList";

class SetExerciseModal extends Component {
  render() {
    return (
      <Modal
        onClose={this.props.removeSetExerciseList}
        open={Boolean(this.props.setExerciseList)}
        closeIcon
      >
        <Header color="green">
          Комплекс упражнений{" - "}
          {this.props.kidInPage.firstName + " " + this.props.kidInPage.lastName}
        </Header>
        <Modal.Content scrolling>
          {this.props.setExerciseList.map((exercise, index) => (
            <div key={exercise.exerciseId}>
              <Header as="h4">
                {index + 1}
                {". "}
                {exercise.exerciseName}
              </Header>
              <Segment raised>
                <Header as="h5">Инвентарь: </Header>
                {exercise.exerciseInventory}
                <Header as="h5">Методика: </Header>
                {exercise.exerciseSteps}
              </Segment>
              <Header as="h5" />
            </div>
          ))}
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  setExerciseList: state.setExerciseList,
  kidInPage: state.kidInPage
});

const mapDispatchToProps = {
  removeSetExerciseList
};

export default connect(mapStateToProps, mapDispatchToProps)(SetExerciseModal);
