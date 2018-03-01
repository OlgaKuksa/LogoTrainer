import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Label } from "semantic-ui-react";

class SelectSkillRow extends Component {
  state = {
    selectedGroupId: this.props.skills[0].skillGroupId,
    selectedSkillId: this.props.skills[0].skills[0].skillId
  };

  onGroupChange = ev => {
    let groupId = ev.target.value;
    this.setState(prevState => ({
      ...prevState,
      selectedGroupId: groupId,
      selectedSkillId: this.props.skills.find(
        group => group.skillGroupId == groupId
      ).skills[0].skillId
    }));
  };

  onSkillChange = ev => {
    let skillId = ev.target.value;
    this.setState(prevState => ({
      ...prevState,
      selectedSkillId: skillId
    }));
  };
  onLevelChange = ev => {
    return;
  };

  render() {
    return (
      <Form.Group>
        <Label>
          Группа навыков
          <select
            name="skillGroup"
            placeholder="Выберите группу"
            onChange={this.onGroupChange}
          >
            {this.props.skills.map(skillGroup => (
              <option
                value={skillGroup.skillGroupId}
                key={skillGroup.skillGroupId}
              >
                {skillGroup.skillGroupName}
              </option>
            ))}
          </select>
        </Label>
        <Label>
          Навык
          <select
            name="skill"
            placeholder="Выберите навык"
            onChange={this.onSkillChange}
          >
            {this.props.skills
              .find(group => group.skillGroupId == this.state.selectedGroupId)
              .skills.map(skill => (
                <option value={skill.skillId} key={skill.skillId}>
                  {skill.skillName}
                </option>
              ))}
          </select>
        </Label>
        {this.props.isMain && (
          <Label>
            Уровень развития
            <select
              name="level"
              placeholder="Выберите уровень"
              onChange={this.onLevelChange}
            >
              {this.props.skills
                .find(group => group.skillGroupId == this.state.selectedGroupId)
                .skills.find(
                  skill => skill.skillId == this.state.selectedSkillId
                )
                .skillLevels.map(level => (
                  <option value={level.levekId} key={level.levelId}>
                    {level.levelText}
                  </option>
                ))}
            </select>
          </Label>
        )}
      </Form.Group>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.skills
});

export default connect(mapStateToProps, undefined)(SelectSkillRow);
