import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon } from "semantic-ui-react";
import { addSetSettingsModal } from "../../actions/setSettingsInModal";
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
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setSettingsInModal: state.setSettingsInModal
});

const mapDispatchToProps = {
  addSetSettingsModal
};

export default connect(mapStateToProps, mapDispatchToProps)(SetsKids);
