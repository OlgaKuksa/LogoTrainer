import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header, Segment, Button, Icon } from "semantic-ui-react";
import { removeSetExerciseList } from "../../../actions/setExerciseList";
import { createPdfForSet } from "../../../utils/pdf";

class SetExerciseModal extends Component {
  handleCreatePdfBtn = () => {
    createPdfForSet(this.props.setExerciseList, this.props.kidInPage, false);
    this.props.removeSetExerciseList();
  };

  render() {
    return (
      <Modal onClose={this.props.removeSetExerciseList} open closeIcon>
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
        <Modal.Actions>
          <Button color="green" onClick={this.handleCreatePdfBtn}>
            <Icon name="file pdf outline" />Сохранить как pdf-файл
          </Button>
        </Modal.Actions>
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
