import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, Header, Accordion, Icon } from "semantic-ui-react";
import { addSkillModal } from "../../actions/skillInModal";

class SkillCard extends Component {
  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>{this.props.skill.skillName}</Card.Header>
          <div>{"Вопрос теста: " + this.props.skill.skillQuestion}</div>
          {this.props.skill.skillLevels != undefined &&
            this.props.skill.skillLevels.map(level => (
              <div key={level.levelId}>
                {level.levelNumber + "% : " + level.levelText}
              </div>
            ))}
          <Icon
            name="pencil"
            onClick={() => this.props.addSkillModal(this.props.skill)}
            color="olive"
            className="ui right floated"
          />
        </Card.Content>
      </Card>
    );
  }
}

const mapDispatchToProps = {
  addSkillModal
};

export default connect(undefined, mapDispatchToProps)(SkillCard);
