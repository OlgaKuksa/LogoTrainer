import React, { Component } from "react";
import { Header, Checkbox, Form } from "semantic-ui-react";

class TestModalSkillItem extends Component {
  state = {};

  handleChange = (ev, { value }) => {
    this.setState({ value });
    this.props.handleLevelChange(this.props.skillId, value);
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
              />
            </Form.Field>
          ))}
          <Header as="h4" />
        </Form>
      </div>
    );
  }
}

export default TestModalSkillItem;
