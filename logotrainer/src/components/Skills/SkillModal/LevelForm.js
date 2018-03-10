import React, { Component } from "react";
import { Form, Icon } from "semantic-ui-react";

class LevelForm extends Component {
  render() {
    return (
      <Form.Group levelid={this.props.level.levelId}>
        <Form.Input
          type="number"
          label="Уровень (%)"
          name="levelNumber"
          onChange={this.props.onLevelPropertyChange}
          width={2}
          required
          defaultValue={
            this.props.level.levelNumber == undefined
              ? ""
              : this.props.level.levelNumber
          }
        />
        <Form.Input
          type="text"
          placeholder="Вариант ответа"
          label="Текстовое описание"
          name="levelText"
          onChange={this.props.onLevelPropertyChange}
          width={14}
          required
          defaultValue={
            this.props.level.levelText === undefined
              ? ""
              : this.props.level.levelText
          }
        />
        {this.props.canBeRemoved ? (
          <Icon
            name="remove circle"
            color="red"
            size="big"
            onClick={this.props.removeLevelBtnHandler}
          />
        ) : null}
      </Form.Group>
    );
  }
}

export default LevelForm;
