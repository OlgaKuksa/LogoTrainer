import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, List } from "semantic-ui-react";
import { addSetSettingsModal } from "../../../actions/setSettingsInModal";
import SetSettingsModal from "./SetSettingsModal";

class SetsKids extends Component {
  render() {
    return (
      <div>
        <Button
          color="olive"
          onClick={() => this.props.addSetSettingsModal({})}
        >
          <Icon name="sticky note outline" />
          Автогенерация комплекса
        </Button>
        {this.props.setSettingsInModal == null ? null : <SetSettingsModal />}
        {this.props.setList == null ? null : (
          <List bulleted>
            {this.props.setList.map(set => (
              <List.Item key={set.kidSetId}>
                <List.Header>
                  {"Комплекс от " + set.createDateTime.toLocaleDateString()}
                </List.Header>
              </List.Item>
            ))}
          </List>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setSettingsInModal: state.setSettingsInModal,
  setList: state.setList
});

const mapDispatchToProps = {
  addSetSettingsModal
};

export default connect(mapStateToProps, mapDispatchToProps)(SetsKids);
