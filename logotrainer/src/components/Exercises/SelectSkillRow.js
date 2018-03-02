import React, { Component } from "react";
import { connect } from "react-redux";
import { Form, Label, Icon, Dropdown } from "semantic-ui-react";

class SelectSkillRow extends Component {
  state = {
    selectedGroupId: this.props.skills.find(
      group =>
        group.skills.find(skill => skill.skillId == this.props.skillId) !=
        undefined
    ).skillGroupId,
    selectedSkillId: this.props.skillId,
    selectedLevelId: this.props.levelId || 0
  };

  onGroupChange = ev => {
    let groupId = ev.target.value;
    let skillId = this.props.skills.find(group => group.skillGroupId == groupId)
      .skills[0].skillId;
    this.setState({
      ...this.state,
      selectedGroupId: groupId,
      selectedSkillId: skillId
    });
    this.props.updateSecondarySkill(skillId, this.props.index);
  };

  onSkillChange = ev => {
    let skillId = ev.target.value;
    this.setState(prevState => ({
      ...prevState,
      selectedSkillId: skillId
    }));
    this.props.updateSecondarySkill(ev.target.value, this.props.index);
  };
  onLevelChange = ev => {
    return;
  };

  render() {
    return (
      <div>
        <Form.Group>
          <Label>
            Группа навыков
            <select
              name="skillGroup"
              placeholder="Выберите группу"
              onChange={this.onGroupChange}
              defaultValue={this.state.selectedGroupId}
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
              defaultValue={this.state.selectedSkillId}
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
                defaultValue={this.state.selectedLevelId}
              >
                {this.props.skills
                  .find(
                    group => group.skillGroupId == this.state.selectedGroupId
                  )
                  .skills.find(
                    skill => skill.skillId == this.state.selectedSkillId
                  )
                  .skillLevels.map(level => (
                    <option value={level.levelId} key={level.levelId}>
                      {level.levelText}
                    </option>
                  ))}
              </select>
            </Label>
          )}
          {this.props.isLast && (
            <Icon
              name="remove circle"
              color="red"
              size="big"
              onClick={this.props.removeSecondarySkill}
            />
          )}
        </Form.Group>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.skills
});

export default connect(mapStateToProps, undefined)(SelectSkillRow);
