import React, { Component } from "react";
import { Icon, Button, Menu, Grid } from "semantic-ui-react";
import { clearKidPage } from "../../actions/kidInPage";
import { connect } from "react-redux";
import "./KidPage.css";
import ProfileKid from "./ProfileKid";
import SetsKid from "./SetsKid";

class KidPage extends Component {
  state = {
    activeItem: "sets"
  };
  handleItemClick = (ev, { name }) => {
    this.setState({ activeItem: name });
  };
  render() {
    return (
      <div>
        <Menu tabular color="olive" inverted>
          <Menu.Item>
            <Button color="olive" onClick={this.props.clearKidPage}>
              <Icon name="arrow left" size="big" />
            </Button>
          </Menu.Item>
          <Menu.Item
            name="profile"
            active={this.state.activeItem == "profile"}
            onClick={this.handleItemClick}
          >
            <Icon name="user circle outline" />
            Профиль
          </Menu.Item>
          <Menu.Item
            name="sets"
            active={this.state.activeItem == "sets"}
            onClick={this.handleItemClick}
          >
            <Icon name="list ol" />
            Комплексы упражнений
          </Menu.Item>
          <Menu.Item
            name="progress"
            active={this.state.activeItem == "progress"}
            onClick={this.handleItemClick}
          >
            <Icon name="line chart" />
            Динамика
          </Menu.Item>
          <div className="KidNameInMenu">
            <Icon name="id card" />
            {this.props.kidInPage.firstName +
              " " +
              this.props.kidInPage.lastName}
          </div>
        </Menu>
        {this.state.activeItem === "profile" && <ProfileKid />}
        {this.state.activeItem === "sets" && <SetsKid />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  kidInPage: state.kidInPage
});

const mapDispatchToProps = {
  clearKidPage
};

export default connect(mapStateToProps, mapDispatchToProps)(KidPage);
