import React, { Component } from "react";
import './Logotrainer.css';
import { Menu, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import Header from '../Header';
import KidsWrapper from '../KidsWrapper';
import Exercises from "../Exercises";

class Logotrainer extends Component {
  state = { activeItem: "kids",
color:'green' };
  handleItemClick = (ev, { name }) => {
    this.setState({ activeItem: name });
  };
  render() {
    return (
      <div>
            <Header/>
        <Menu attached="top" tabular color={this.state.color}>
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
    {this.state.activeItem=='kids'?(<KidsWrapper />):null}
    {this.state.activeItem=='exercises'?(<Exercises />):null}
      </div>
    );
  }
}

export default Logotrainer;
