import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Menu,
  Grid,
  Segment,
  Button,
  Icon,
  CardGroup,
  Card
} from "semantic-ui-react";
import SkillCard from "./SkillCard";

class Skills extends Component {
  state = {
    activeItem: this.props.skills[0].skillGroupId
  };
  handleMenuItemClick = (e, { id }) => {
    this.setState({
      activeItem: id
    });
  };
  render() {
    let selectedGroup = this.props.skills.find(
      item => item.skillGroupId == this.state.activeItem
    );
    return (
      <div>
        <Grid>
          <Grid.Column width={4}>
            <Menu fluid vertical tabular color="olive">
              {this.props.skills.map(item => (
                <Menu.Item
                  name={item.skillGroupName}
                  id={item.skillGroupId}
                  key={item.skillGroupId}
                  active={this.state.activeItem == item.skillGroupId}
                  onClick={this.handleMenuItemClick}
                />
              ))}
            </Menu>
            <Button color="olive">
              <Icon name="add" size="big" textAlign="center"/> Добавить группу навыков
            </Button>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            <CardGroup itemsPerRow={2} className="ui link cards">
              {selectedGroup.skills.map(item => (
                <SkillCard skill={item} key={item.id} />
              ))}
              <Card>
                <Card.Content textAlign="center">
                <Icon name="plus square outline" size="massive" color="olive"/>
                </Card.Content>
              </Card>
            </CardGroup>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.skills
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
