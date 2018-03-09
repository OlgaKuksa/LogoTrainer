import React, { Component } from "react";
import "./Logotrainer.css";
import { Menu, Icon, Segment } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Header from "../Header";
import KidsWrapper from "../KidsWrapper";
import Exercises from "../Exercises";
import Skills from "../Skills/Skills";
import { connect } from "react-redux";
import { getSkillsAsync } from "../../actions/skills";

class Logotrainer extends Component {
  state = {
    activeItem: "kids",
    color: "green"
  };
  handleItemClick = (ev, { name }) => {
    this.setState({ activeItem: name });
  };

  render() {
    return (
      <div>
        <Segment attached="top">
          <Header />
          <Menu
            compact
            borderless
            color={this.state.color}
            secondary
            pointing
            size="large"
          >
            <Menu.Item
              name="kids"
              active={this.state.activeItem == "kids"}
              onClick={this.handleItemClick}
            >
              <Icon name="users" />
              Воспитанники
            </Menu.Item>
            <Menu.Item
              name="exercises"
              active={this.state.activeItem == "exercises"}
              onClick={this.handleItemClick}
            >
              <Icon name="file audio outline" />
              Упражнения
            </Menu.Item>
            <Menu.Item
              name="skills"
              active={this.state.activeItem == "skills"}
              onClick={this.handleItemClick}
            >
              <Icon name="trophy" />
              Навыки и критерии их оценки
            </Menu.Item>
          </Menu>
        </Segment>
        <div className="margins5">
          {this.state.activeItem == "kids" ? <KidsWrapper /> : null}
          {this.state.activeItem == "exercises" ? <Exercises /> : null}
          {this.state.activeItem == "skills" ? <Skills /> : null}
        </div>
      </div>
    );
  }
}
const mapDispatchToProps = { getSkillsAsync };
export default connect(undefined, mapDispatchToProps)(Logotrainer);
