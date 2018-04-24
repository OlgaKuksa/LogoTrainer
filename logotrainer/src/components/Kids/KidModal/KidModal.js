import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Button, Form, Header } from "semantic-ui-react";
import {
  addKidAsync as addKid,
  updateKidAsync as updateKid
} from "../../../actions/kids";
import { clearModal } from "../../../actions/kidInModal";

class KidModal extends Component {
  constructor(props) {
    super(props);
    const isNew = !props.kidInModal || !props.kidInModal.kidId;
    const {
      firstName = "",
      lastName = "",
      isArchived = false,
      dateOfBirth = new Date(),
      middleName = "",
      homeAddress = "",
      homePhone = "",
      parentInfo = "",
      parentMobile = ""
    } =
      props.kidInModal || {};
    const kidInModal = {
      ...(props.kidInModal || {}),
      firstName,
      lastName,
      isArchived,
      middleName,
      homeAddress,
      homePhone,
      parentInfo,
      parentMobile,
      dateOfBirth: new Date(dateOfBirth).toISOString().substring(0, 10)
    };
    this.state = { isNew, kidInModal };
  }
  onKidPropertyChanged = e => {
    const name = e.target.getAttribute("name");
    const value =
      e.target.getAttribute("type") === "checkbox"
        ? e.target.checked
        : e.target.value;
    this.setState(prevState => ({
      kidInModal: { ...prevState.kidInModal, [name]: value }
    }));
  };
  onSaveKid = () => {
    const { isNew, kidInModal } = this.state;
    const { addKid, updateKid } = this.props;
    if (isNew) addKid(kidInModal);
    else updateKid(kidInModal);
  };
  render() {
    const {
      isNew,
      kidInModal: {
        firstName,
        lastName,
        isArchived,
        dateOfBirth,
        middleName,
        homeAddress,
        homePhone,
        parentInfo,
        parentMobile
      }
    } = this.state;
    let legend = isNew ? "Добавить ребенка" : "Редактировать";
    let btnLabel = isNew ? "Добавить" : "Сохранить";
    return (
      <Modal
        onClose={this.props.clearModal}
        open={Boolean(this.props.kidInModal)}
        closeIcon
      >
        <Header icon="child" color="green" content={legend} />
        <Modal.Content scrolling>
          <Form>
            <Form.Input
              type="text"
              placeholder="Фамилия ребенка"
              label="Фамилия ребенка"
              name="lastName"
              defaultValue={lastName}
              onChange={this.onKidPropertyChanged}
            />
            <Form.Input
              type="text"
              placeholder="Имя ребенка"
              label="Имя ребенка"
              name="firstName"
              defaultValue={firstName}
              onChange={this.onKidPropertyChanged}
            />
            <Form.Input
              type="text"
              placeholder="Отчество ребенка"
              label="Отчество ребенка"
              name="middleName"
              defaultValue={middleName}
              onChange={this.onKidPropertyChanged}
            />
            <Form.Input
              label="Дата рождения"
              type="date"
              name="dateOfBirth"
              defaultValue={dateOfBirth}
              onChange={this.onKidPropertyChanged}
            />
            <Form.Input
              type="text"
              placeholder="Город, улица, дом, квартира"
              label="Домашний адрес"
              name="homeAddress"
              defaultValue={homeAddress}
              onChange={this.onKidPropertyChanged}
            />
            <Form.Input
              type="text"
              placeholder="Домашний телефон"
              label="Домашний телефон"
              name="homePhone"
              defaultValue={homePhone}
              onChange={this.onKidPropertyChanged}
            />
            <Form.Input
              type="text"
              placeholder="ФИО законного представителя"
              label="ФИО законного представителя"
              name="parentInfo"
              defaultValue={parentInfo}
              onChange={this.onKidPropertyChanged}
            />
            <Form.Input
              type="text"
              placeholder="Телефон законного представителя"
              label="Мобильный телефон законного представителя"
              name="parentMobile"
              defaultValue={parentMobile}
              onChange={this.onKidPropertyChanged}
            />
            <Form.Field
              label="Выбыл из группы"
              control="input"
              type="checkbox"
              defaultChecked={isArchived}
              name="isArchived"
              onChange={this.onKidPropertyChanged}
            />
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.onSaveKid}>
            {btnLabel}
          </Button>
        </Modal.Actions>
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
