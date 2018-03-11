import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, Icon } from "semantic-ui-react";
import { BarChart, XAxis, YAxis, Bar, Tooltip, Legend } from "recharts";

class ProgressKid extends Component {
  render() {
    {
      console.log(this.props.profiles);
    }
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
            <BarChart width={500} height={300} data={this.props.profiles}>
              <XAxis dataKey="profileDate" />
              <YAxis />
              <Legend />
              <Tooltip content={<div>{}</div>}/>
              <Bar dataKey="skillValue" fill="#8884d8" />
            </BarChart>
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profiles: state.testResults.map(profile => ({
    profileDate: profile.createDateTime,
    skillValue: state.skills
      .find(skillgroup => {
        return (
          skillgroup.skills.find(skill => skill.skillId == "11") != undefined
        );
      })
      .skills.find(skill => skill.skillId == "11")
      .skillLevels.find(level => level.levelId == profile.testResult["11"])
      .levelNumber
  }))
});

export default connect(mapStateToProps, undefined)(ProgressKid);
