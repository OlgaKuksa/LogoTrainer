import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Header, Form, Message } from "semantic-ui-react";
import { removeSkillModal } from "../../../actions/skillInModal";
import LevelForm from './LevelForm';

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
              required
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
              required
              defaultValue={
                this.props.skillInModal.skillQuestion == undefined
                  ? ""
                  : this.props.skillInModal.skillQuestion
              }
            />
            {this.props.skillInModal.skillLevels!=undefined&&this.props.skillInModal.skillLevels.map(item=>
            <LevelForm level={item} key={item.levelId}/>)}
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
          <Message color='olive'> 1 - навык практически сформирован (лучшая оценка), max - навыка практически нет (худшая оценка)</Message>
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
