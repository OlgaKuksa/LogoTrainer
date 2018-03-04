import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header } from "semantic-ui-react";
import { removeTestModal } from "../../actions/testInModal";
import TestModalSkillItem from "./TestModalSkillItem";
import Button from "semantic-ui-react/dist/commonjs/elements/Button/Button";

class TestModal extends Component {
  state = { ...this.props.testInModal };

  handleLevelChange = (skillId, levelId) => {
    this.setState({ ...this.state, skillId: levelId });
  };

  render() {
    return (
      <Modal
        onClose={this.props.removeTestModal}
        open={Boolean(this.props.testInModal)}
        closeIcon
      >
        <Modal.Header>Оценка навыков ребенка</Modal.Header>
        <Modal.Content scrolling>
          {this.props.skills.map(skillGroup => {
            return (
              <div key={skillGroup.skillGroupId}>
                <Header as="h3">{skillGroup.skillGroupName}</Header>
                {skillGroup.skills.map(skill => (
                  <TestModalSkillItem
                    isReadOnly={false}
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
          <Button color="olive">Записать</Button>
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
  removeTestModal
};

export default connect(mapStateToProps, mapDispatchToProps)(TestModal);
