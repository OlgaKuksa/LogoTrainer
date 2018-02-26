import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Form } from "semantic-ui-react";
import { removeSkillModal } from "../../../actions/skillInModal";

class SkillModal extends Component {
  render() {
    let legend =
      Object.getOwnPropertyNames(this.props.skillInModal).length === 0
        ? "Добавить навык"
        : "Редактировать навык";
    let btnLabel =
      Object.getOwnPropertyNames(this.props.skillInModal).length === 0
        ? "Добавить"
        : "Сохранить";

    return (
      <Modal
        onClose={this.props.removeSkillModal}
        open={Boolean(this.props.skillInModal)}
        closeIcon
      >
        <Modal.Header>{legend}</Modal.Header>
        <Modal.Content>
        <Form>
        <Form.Input
              type="text"
              placeholder="Название навыка"
              label="Название навыка"
              defaultValue={
                this.props.skillInModal.skillName == undefined
                  ? ""
                  : this.props.skillInModal.skillName
              }
            />
             <Form.Input
              type="text"
              placeholder="Вопрос для теста"
              label="Вопрос для теста"
              defaultValue={
                this.props.skillInModal.skillQuestion == undefined
                  ? ""
                  : this.props.skillInModal.skillQuestion
              }
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
        {Object.getOwnPropertyNames(this.props.skillInModal)
                .length != 0 && (
                <Button color="red">
                  Удалить
                </Button>
              )}
              <Button color="green" className="ui right floated button">
                {btnLabel}
              </Button>
          </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  skillInModal: state.skillInModal
});

const mapDispatchToProps = {
  removeSkillModal
};

export default connect(mapStateToProps, mapDispatchToProps)(SkillModal);
