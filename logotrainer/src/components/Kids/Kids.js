import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardGroup,
  Icon,
  Label,
  Dimmer,
  Segment
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { getGroupsAsync as getGroups } from "../../actions/groups";
import { getKidsAsync as getKids } from "../../actions/kids";
import { addToModal } from "../../actions/kidInModal";
import { addKidToPageAsync } from "../../actions/kidInPage";
import KidModal from "./KidModal";

class Kids extends Component {
  state = {
    selectedGroup:
      this.props.groups != null ? this.props.groups[0].groupId : null
  };

  groupChanged = ev => {
    this.setState({ selectedGroup: ev.target.value });
  };
  componentDidMount() {
    if (this.props.groups == null) {
      this.props.getGroups();
    }
    if (this.props.kids == null) {
      this.props.getKids();
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.groups == null && nextProps.groups != null) {
      const selectedGroup = nextProps.groups.map(it => it.groupId)[0];
      this.setState({ selectedGroup });
    }
  }

  addNewKid = () => {
    this.props.addToModal({ groupId: this.state.selectedGroup });
  };

  render() {
    if (this.props.kids == null) {
      //loading
      return (
        <Dimmer.Dimmable as={Segment}>
          <Dimmer active />
        </Dimmer.Dimmable>
      );
    }
    let filteredKids = this.props.kids.filter(
      item => item.groupId == this.state.selectedGroup
    );

    return (
      <div>
        {this.props.groups != null && this.props.groups.length > 0 ? (
          <Label>
            Группа
            <select
              name="kidsGroup"
              placeholder="Выберите группу"
              onChange={this.groupChanged}
            >
              {this.props.groups.map(item => (
                <option value={item.groupId} key={item.groupId}>
                  {item.groupNumber}
                </option>
              ))}
            </select>
          </Label>
        ) : null}
        <CardGroup itemsPerRow={5} className="ui link cards">
          {filteredKids.map((item, index) => (
            <Card key={index} color="olive">
              <Card.Content onClick={() => this.props.addKidToPageAsync(item)}>
                <Card.Header>
                  {item.firstName} {item.lastName}
                </Card.Header>
                <Card.Meta>Дата рождения: {item.dateOfBirth}</Card.Meta>
                <Card.Description>Группа {item.group}</Card.Description>
              </Card.Content>
              <Icon
                name="edit"
                color="olive"
                size="large"
                onClick={() => this.props.addToModal(item)}
              />
            </Card>
          ))}
          <Card>
            <Card.Content textAlign="center" onClick={this.addNewKid}>
              <Icon name="add user" size="huge" color="olive" />
            </Card.Content>
          </Card>
        </CardGroup>
        {this.props.kidInModal == null ? null : <KidModal />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  groups: state.groups,
  kids: state.kids,
  kidInModal: state.kidInModal
});

const mapDispatchToProps = {
  getGroups,
  getKids,
  addToModal,
  addKidToPageAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(Kids);
