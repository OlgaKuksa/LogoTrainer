import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Icon, Button, Form, Header } from "semantic-ui-react";
import { addKid, updateKid } from "../../actions/kids";
import { clearModal } from "../../actions/kidInModal";

class KidModal extends Component {
  render() {
    let legend =
    Object.getOwnPropertyNames(this.props.kidInModal).length === 0
        ? "Добавить ребенка"
        : "Редактировать";
    let btnLabel = Object.getOwnPropertyNames(this.props.kidInModal).length === 0 ? "Добавить" : "Сохранить";
    return (
      <Modal 
        onClose={this.props.clearModal}
        open={Boolean(this.props.kidInModal)}
        closeIcon
      >
        <Header icon='child' color='green' content={legend}/>
        <Modal.Content>
          <Form>
            <Form.Input
              type="text"
              placeholder="Фамилия ребенка"
              label="Фамилия ребенка"
              defaultValue={
                this.props.kidInModal == null
                  ? ""
                  : this.props.kidInModal.lastName
              }
            />
            <Form.Input
              type="text"
              placeholder="Имя ребенка"
              label="Имя ребенка"
              defaultValue={
                this.props.kidInModal == null
                  ? ""
                  : this.props.kidInModal.firstName
              }
            />
            <Form.Input
              label="Дата рождения"
              type="date"
              defaultValue={
                this.props.kidInModal == null
                  ? new Date().toISOString().substring(0, 10)
                  : this.props.kidInModal.dateOfBirth
              }
              name="date"
            />
            <Form.Field
              label="Выбыл из группы"
              control="input"
              type="checkbox"
              defaultValue={
                this.props.kidInModal == null
                  ? false
                  : this.props.kidInModal.isArchived
              }
            />
            <Button className="ui right floated button" color="green">
              {btnLabel}
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  kidInModal: state.kidInModal
});

const mapDispatchToProps = {
  addKid,
  updateKid,
  clearModal
};

export default connect(mapStateToProps, mapDispatchToProps)(KidModal);
