import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, Icon, Header } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
class ProgressKid extends Component {
  render() {
    console.log(this.props.profiles);
    return (
      <div>
        {this.props.profiles.length < 3 ? (
          <Message compact color="olive">
            <Icon name="warning circle" />
            Динамику развития ребенка можно показать при наличии минимум 3
            профилей
          </Message>
        ) : (
          <div>
            <Header>Средний уровень развития навыков по группе навыков</Header>
            <BarChart width={500} height={300} data={this.props.profiles}>
              <XAxis dataKey="profileDate" />
              <YAxis />
              <Legend />
              <Tooltip />
              {this.props.skills.map(
                ({ skillGroupId, skillGroupName }, index) => (
                  <Bar
                    key={skillGroupId}
                    dataKey={skillGroupName}
                    fill={COLORS[index % COLORS.length]}
                  />
                )
              )}
            </BarChart>
          </div>
        )}
      </div>
    );
  }
}
const getLevelNumberByLevelId = skillGroups => {
  const ret = {};
  for (const skillGroup of skillGroups) {
    const { skills } = skillGroup;
    if (!skills) continue;
    for (const skill of skills) {
      const { skillLevels } = skill;
      if (!skillLevels) continue;
      for (const { levelId, levelNumber } of skillLevels)
        ret[levelId] = levelNumber;
    }
  }
  return ret;
};

const mapStateToProps = state => {
  const levelNumberByLevelId = getLevelNumberByLevelId(state.skills);
  const getAverageForSkillGroup = (skillGroup, testResult) => {
    let sum = 0;
    let count = 0;
    const { skills } = skillGroup;
    if (!skills) return undefined;
    for (const { skillId } of skills) {
      const levelId = testResult[skillId];
      if (!levelId) continue;
      ++count;
      sum += levelNumberByLevelId[levelId] || 0;
    }
    if (count) return sum / count;
  };
  const getAverageForSkillGroups = (skillGroups, testResult) => {
    const ret = {};
    for (const skillGroup of skillGroups) {
      const average = getAverageForSkillGroup(skillGroup, testResult);
      if (average == null) continue;
      ret[skillGroup.skillGroupName] = average;
    }
    return ret;
  };
  return {
    skills: state.skills,
    profiles: state.testResults.map(profile => ({
      ...getAverageForSkillGroups(state.skills, profile.testResult),
      profileDate: new Date(profile.createDateTime).toLocaleDateString()
    }))
  };
};

export default connect(mapStateToProps, undefined)(ProgressKid);
