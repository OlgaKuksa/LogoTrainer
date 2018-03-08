import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Icon, List } from "semantic-ui-react";
import { addSetSettingsModal } from "../../../actions/setSettingsInModal";
import { getExercisesApiAsync } from "../../../actions/setExerciseList";
import SetSettingsModal from "./SetSettingsModal";
import SetExerciseModal from "./SetExerciseModal";

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
        {this.props.setList == null ? null : (
          <List bulleted>
            {this.props.setList.map(set => (
              <List.Item key={set.kidSetId}>
                <List.Header>
                  <a
                    onClick={() =>
                      this.props.getExercisesApiAsync(set.kidSetId)
                    }
                  >
                    {"Комплекс от " +
                      set.createDateTime.toLocaleDateString() +
                      " - " +
                      set.exerciseIdsInSet.length +
                      " упр."}
                  </a>
                </List.Header>
              </List.Item>
            ))}
          </List>
        )}
        {this.props.setSettingsInModal == null ? null : <SetSettingsModal />}
        {this.props.setExerciseList === null ? null : <SetExerciseModal />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  setSettingsInModal: state.setSettingsInModal,
  setList: state.setList,
  setExerciseList: state.setExerciseList,
  kidInPage: state.kidInPage
});

const mapDispatchToProps = {
  addSetSettingsModal,
  getExercisesApiAsync
};

export default connect(mapStateToProps, mapDispatchToProps)(SetsKids);
