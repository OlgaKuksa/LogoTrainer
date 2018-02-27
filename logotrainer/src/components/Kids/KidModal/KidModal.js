import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Icon, Button, Form, Header } from "semantic-ui-react";
import { addKid, updateKid } from "../../../actions/kids";
import { clearModal } from "../../../actions/kidInModal";

class KidModal extends Component {
  constructor(props) {
    super(props);
    const isNew = !props.kidInModal || !props.kidInModal.id;
    const { firstName = "", lastName = "", isArchived = false } =
      props.kidInModal || {};
    this.state = { isNew, firstName, lastName, isArchived };
  }
  onFirstNameChange = e => {
    this.setState({ firstName: e.target.value });
  };
  onLastNameChange = e => {
    this.setState({ lastName: e.target.value });
  };
  onIsArchivedChanged = e => {
    this.setState({ isArchived: e.target.checked });
  };
  onAddKid = () => {
    const { firstName, lastName, isArchived } = this.state;
    this.props.addKid({ firstName, lastName, isArchived });
  };
  onUpdateKid = () => {
    const { firstName, lastName, isArchived } = this.state;
    const kid = this.props.kidInModal;
    this.props.updateKid({ ...kid, firstName, lastName, isArchived });
  };
  render() {
    const { isNew, firstName, lastName, isArchived } = this.state;
    let legend = isNew ? "Добавить ребенка" : "Редактировать";
    let btnLabel = isNew ? "Добавить" : "Сохранить";
    return (
      <Modal
        onClose={this.props.clearModal}
        open={Boolean(this.props.kidInModal)}
        closeIcon
      >
        <Header icon="child" color="green" content={legend} />
        <Modal.Content>
          <Form>
            <Form.Input
              type="text"
              placeholder="Фамилия ребенка"
              label="Фамилия ребенка"
              value={firstName}
              onChange={this.onFirstNameChange}
            />
            <Form.Input
              type="text"
              placeholder="Имя ребенка"
              label="Имя ребенка"
              value={lastName}
              onChange={this.onLastNameChange}
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
              checked={isArchived}
              onChange={this.onIsArchivedChanged}
            />
            <Button
              className="ui right floated button"
              color="green"
              onClick={isNew ? this.onAddKid : this.onUpdateKid}
            >
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
