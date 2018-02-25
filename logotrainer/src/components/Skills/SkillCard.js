import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Header, Accordion } from "semantic-ui-react";

class SkillCard extends Component {
  render() {
    return <Card>
        <Card.Content>
    <Card.Header>
        {this.props.skill.skillName}
        </Card.Header>
        <div>
        {"Вопрос теста: "+this.props.skill.skillQuestion}
        </div>
        {this.props.skill.skillLevels.map(level=>
        (<div>{level.levelNumber + ' : ' + level.levelText}</div>))}
        </Card.Content>
    </Card>;
  }
}

export default SkillCard;
