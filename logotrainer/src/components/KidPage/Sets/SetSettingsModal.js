import React, { Component } from "react";
import { connect } from "react-redux";
import { Modal, Header, Checkbox, Button, Form } from "semantic-ui-react";
import {
  removeSetSettingsModal,
  sendSettingsToGenerateSetAsync
} from "../../../actions/setSettingsInModal";

class SetSettingsModal extends Component {
  state = {
    selectedSkillIds: []
  };

  handleChange = (e, { value }) => {
    this.state.selectedSkillIds.includes(value)
      ? this.setState({
          selectedSkillIds: this.state.selectedSkillIds.filter(
            item => item != value
          )
        })
      : this.setState({
          selectedSkillIds: [...this.state.selectedSkillIds, value]
        });
  };

  render() {
    return (
      <Modal
        onClose={this.props.removeSetSettingsModal}
        open={Boolean(this.props.setSettingsInModal)}
        closeIcon
      >
        <Header color="green">Выбор целевых навыков для комплекса</Header>
        <Modal.Content>
          <Form>
            {this.props.skills.map(skillGroup => {
              return (
                <div key={skillGroup.skillGroupId}>
                  {skillGroup.skills.length === 0 ? null : (
                    <Header as="h3">{skillGroup.skillGroupName}</Header>
                  )}
                  {skillGroup.skills.map(skill => (
                    <Form.Field key={skill.skillId} color="green">
                      <Checkbox
                        value={skill.skillId}
                        label={skill.skillName}
                        onChange={this.handleChange}
                        checked={this.state.selectedSkillIds.includes(
                          skill.skillId
                        )}
                      />
                    </Form.Field>
                  ))}
                  <Header as="h4" />
                </div>
              );
            })}
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="green"
            onClick={() =>
              this.props.sendSettingsToGenerateSetAsync(
                this.props.kidId,
                this.state.selectedSkillIds
              )
            }
          >
            Сгенерировать комплекс
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
const mapStateToProps = state => ({
  setSettingsInModal: state.setSettingsInModal,
  skills: state.skills,
  kidId: state.kidInPage.kidId
});

const mapDispatchToProps = {
  removeSetSettingsModal,
  sendSettingsToGenerateSetAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(SetSettingsModal);
