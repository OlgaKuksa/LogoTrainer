import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header, Message, Icon } from "semantic-ui-react";
import { removeTestModal } from "../../../actions/testInModal";
import { addTestResultAsync } from "../../../actions/testResults";
import TestModalSkillItem from "./TestModalSkillItem";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

class TestModal extends Component {
  state = {
    testInModal: { ...this.props.testInModal },
    hasError: false
  };

  handleLevelChange = (skillId, levelId) => {
    this.setState(prevState => ({
      testInModal: {
        ...prevState.testInModal,
        [skillId]: levelId
      }
    }));
  };

  addTestResultBtnHandler = () => {
    if (this.hasUnansweredSkills()) return;
    this.props.addTestResultAsync(
      this.props.kidInPage.kidId,
      this.state.testInModal
    );
  };

  hasUnansweredSkills = () => {
    if (
      this.props.skills.find(
        skillgroup =>
          skillgroup.skills.find(skill => {
            return this.state.testInModal[skill.skillId];
          }) === undefined
      ) === undefined
    )
      return false;
    else {
      this.setState({ error: true });
      return true;
    }
  };

  render() {
    return (
      <Modal
        onClose={this.props.removeTestModal}
        open={Boolean(this.props.testInModal)}
        closeIcon
      >
        <Header color="green">
          {this.state.testInModal.createDateTime !== undefined
            ? this.props.kidInPage.firstName +
              " " +
              this.props.kidInPage.lastName +
              " - профиль от " +
              new Date(
                this.state.testInModal.createDateTime
              ).toLocaleDateString()
            : "Oценка навыков ребенка"}
        </Header>
        <Modal.Content scrolling>
          {this.props.skills.map(skillGroup => {
            return (
              <div key={skillGroup.skillGroupId}>
                {skillGroup.skills.length === 0 ? null : (
                  <Header as="h3">{skillGroup.skillGroupName}</Header>
                )}
                {skillGroup.skills.map(skill => (
                  <TestModalSkillItem
                    skillItem={skill}
                    key={skill.skillId}
                    handleLevelChange={this.handleLevelChange}
                  />
                ))}
              </div>
            );
          })}
        </Modal.Content>
        <Modal.Actions>
          {this.state.error && (
            <Message negative>
              Для записи профиля ребенка нужно ответить на все вопросы теста
            </Message>
          )}
          {this.state.testInModal.kidProfileId !== undefined ? null : (
            <Button color="green" onClick={this.addTestResultBtnHandler}>
              Записать
            </Button>
          )}
        </Modal.Actions>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  testInModal: state.testInModal,
  skills: state.skills,
  kidInPage: state.kidInPage
});

const mapDispatchToProps = {
  removeTestModal,
  addTestResultAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(TestModal);
