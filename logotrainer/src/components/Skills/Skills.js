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
import { addSkillModal } from "../../actions/skillInModal";
import { addSkillGroupModal } from "../../actions/skillGroupInModal";
import SkillModal from "./SkillModal";
import SkillGroupModal from "./SkillGroupModal";

class Skills extends Component {
  state = {
    activeItem: (this.props.skills[0] || {}).skillGroupId || 0
  };
  handleMenuItemClick = (e, { id }) => {
    this.setState({
      activeItem: id
    });
  };
  render() {
    let selectedGroup =
      this.props.skills == null
        ? {}
        : this.props.skills.find(
            item => item.skillGroupId === this.state.activeItem
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
                >
                  {item.skillGroupName}
                  <Icon
                    name="pencil"
                    onClick={e => {
                      this.props.addSkillGroupModal(item);
                      e.stopPropagation();
                    }}
                  />
                </Menu.Item>
              ))}
            </Menu>
            <Button
              color="olive"
              onClick={() => this.props.addSkillGroupModal({})}
            >
              <Icon name="add" size="big" /> Добавить группу навыков
            </Button>
          </Grid.Column>
          <Grid.Column stretched width={12}>
            {selectedGroup !== undefined && (
              <CardGroup itemsPerRow={2} className="ui link cards">
                {selectedGroup.skills.map(item => (
                  <SkillCard key={item.skillId} skill={item} />
                ))}
                <Card
                  onClick={() => this.props.addSkillModal({ skillLevels: [] })}
                >
                  <Card.Content textAlign="center">
                    <Icon
                      name="plus square outline"
                      size="massive"
                      color="olive"
                    />
                  </Card.Content>
                </Card>
              </CardGroup>
            )}
          </Grid.Column>
        </Grid>
        {this.props.skillInModal == null ? null : (
          <SkillModal groupid={selectedGroup.skillGroupId} />
        )}
        {this.props.skillGroupInModal == null ? null : <SkillGroupModal />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  skills: state.skills,
  skillInModal: state.skillInModal,
  skillGroupInModal: state.skillGroupInModal
});

const mapDispatchToProps = {
  addSkillModal,
  addSkillGroupModal
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
