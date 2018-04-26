import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Card,
  CardGroup,
  Icon,
  Label,
  Dimmer,
  Segment,
  Checkbox
} from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { getGroupsAsync as getGroups } from "../../actions/groups";
import { getKidsAsync as getKids } from "../../actions/kids";
import { addToModal } from "../../actions/kidInModal";
import { addKidToPageAsync } from "../../actions/kidInPage";
import {
  setActiveGroupId,
  changeGraduatesVisibility
} from "../../actions/kidsView";
import KidModal from "./KidModal";
import LoadingDimmer from "../LoadingDimmer";

class Kids extends Component {
  groupChanged = ev => {
    this.props.setActiveGroupId(ev.target.value);
  };

  addNewKid = () => {
    this.props.addToModal({ groupId: this.props.activeGroupId });
  };

  changeGraduates = (ev, data) => {
    this.props.changeGraduatesVisibility(data.checked);
  };

  constructor(props) {
    super(props);
    if (props.groups == null) {
      props.getGroups();
    }
    if (props.kids == null) {
      props.getKids();
    }
  }

  render() {
    if (this.props.kids === null) return <LoadingDimmer />;

    let filteredKids = this.props.kids.filter(
      item =>
        this.props.withArchived
          ? item.groupId == this.props.activeGroupId
          : item.groupId == this.props.activeGroupId && item.isArchived == 0
    );

    return (
      <div>
        {this.props.groups != null && this.props.groups.length > 0 ? (
          <div>
            <Label>
              Группа
              <select
                name="kidsGroup"
                placeholder="Выберите группу"
                onChange={this.groupChanged}
                defaultValue={this.props.activeGroupId}
              >
                {this.props.groups.map(item => (
                  <option value={item.groupId} key={item.groupId}>
                    {item.groupNumber}
                  </option>
                ))}
              </select>
            </Label>
            <Checkbox
              label="Показать выбывших воспитанников"
              checked={this.props.withArchived}
              onClick={this.changeGraduates}
            />
          </div>
        ) : null}
        <CardGroup itemsPerRow={5} className="ui link cards">
          {filteredKids.map((item, index) => (
            <Card key={index} color="olive">
              <Card.Content>
                <Card.Header onClick={() => this.props.addKidToPageAsync(item)}>
                  {item.firstName} {item.lastName}
                </Card.Header>
                <Card.Meta>
                  Дата рождения:{" "}
                  {new Date(item.dateOfBirth).toLocaleDateString()}
                </Card.Meta>
                <Icon
                  name="edit"
                  color="olive"
                  size="large"
                  onClick={() => this.props.addToModal(item)}
                  className="ui right floated"
                />
              </Card.Content>
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
  kidInModal: state.kidInModal,
  withArchived: state.kidsView.withArchived,
  activeGroupId: state.kidsView.activeGroupId
});

const mapDispatchToProps = {
  getGroups,
  getKids,
  addToModal,
  addKidToPageAsync,
  setActiveGroupId,
  changeGraduatesVisibility
};

export default connect(mapStateToProps, mapDispatchToProps)(Kids);
