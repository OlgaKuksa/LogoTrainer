import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header, Label } from "semantic-ui-react";
import { removeTestModal } from "../../../actions/testInModal";
import { addTestResultAsync } from "../../../actions/testResults";
import TestModalSkillItem from "./TestModalSkillItem";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

class TestModal extends Component {
  state = { ...this.props.testInModal };

  handleLevelChange = (skillId, levelId) => {
    this.setState({
      ...this.state,
      [skillId]: levelId
    });
  };

  render() {
    return (
      <Modal
        onClose={this.props.removeTestModal}
        open={Boolean(this.props.testInModal)}
        closeIcon
      >
        <Header color="green">
          {this.state.createDateTime !== undefined
            ? this.props.kidInPage.firstName +
              " " +
              this.props.kidInPage.lastName +
              " - профиль от " +
              this.state.createDateTime.toLocaleDateString()
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
          {this.state.kidProfileId !== undefined ? null : (
            <Button
              color="green"
              onClick={() =>
                this.props.addTestResultAsync(
                  this.props.kidInPage.kidId,
                  this.state
                )
              }
            >
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
