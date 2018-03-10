import React, { Component } from "react";
import { connect } from "react-redux";
import { Header, Checkbox, Form } from "semantic-ui-react";

class TestModalSkillItem extends Component {
  state = {
    value:
      this.props.isReadonly &&
      this.props.testInModal.testResult[this.props.skillItem.skillId]
  };

  handleChange = (ev, { value }) => {
    this.setState({ value });
    this.props.handleLevelChange(this.props.skillItem.skillId, value);
  };

  render() {
    return (
      <div>
        <Header as="h4">{this.props.skillItem.skillQuestion}</Header>
        <Form>
          {this.props.skillItem.skillLevels.map(level => (
            <Form.Field key={level.levelId}>
              <Checkbox
                radio
                value={level.levelId}
                label={level.levelText}
                checked={this.state.value == level.levelId}
                onClick={this.handleChange}
                readOnly={this.props.isReadonly}
                disabled={
                  this.state.value !== level.levelId && this.props.isReadonly
                }
              />
            </Form.Field>
          ))}
          <Header as="h4" />
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testInModal: state.testInModal,
  isReadonly: state.testInModal.kidProfileId !== undefined
});

export default connect(mapStateToProps, undefined)(TestModalSkillItem);
