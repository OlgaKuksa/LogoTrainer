import React, { Component } from "react";
import { connect } from "react-redux";
import { Card, CardGroup, Icon, Label } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import { getKids } from "../../actions/kids";
import { addToModal } from "../../actions/kidInModal";
import { addKidToPageAsync } from "../../actions/kidInPage";
import KidModal from "./KidModal";

class Kids extends Component {
  state = {
    groups: [1, 2, 3],
    selectedGroup: 1
  };

  groupChanged = ev => {
    this.setState({ selectedGroup: ev.target.value });
  };

  render() {
    let filteredKids = this.props.kids.filter(
      item => item.group == this.state.selectedGroup
    );

    return (
      <div>
        <Label>
          Группа
          <select
            name="kidsGroup"
            placeholder="Выберите группу"
            onChange={this.groupChanged}
          >
            {this.state.groups.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
          </select>
        </Label>
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
            <Card.Content
              textAlign="center"
              onClick={() => this.props.addToModal({})}
            >
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
  kids: state.kids,
  kidInModal: state.kidInModal
});

const mapDispatchToProps = {
  getKids,
  addToModal,
  addKidToPageAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(Kids);
