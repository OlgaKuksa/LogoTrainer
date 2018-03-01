import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header, Button, Form, Label } from "semantic-ui-react";
import { removeExerciseFromModal } from "../../../actions/exerciseInModal";
import SelectSkillRow from "../SelectSkillRow";

class ExerciseModal extends Component {
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
            <SelectSkillRow isMain={true} />
            <Label>Дополнительные навыки</Label>
            <SelectSkillRow />
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
  exerciseInModal: state.exerciseInModal
});

const mapDispatchToProps = {
  removeExerciseFromModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseModal);
