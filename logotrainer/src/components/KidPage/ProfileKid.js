import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, List, Icon, Label } from "semantic-ui-react";
import TestModal from "./TestModal";
import { addTestModal } from "../../actions/testInModal";

class ProfileKid extends Component {
  render() {
    return (
      <div>
        {this.props.testResults == null ? null : (
          <div>
            <Button color="olive" onClick={() => this.props.addTestModal({})}>
              Пройти тест
            </Button>
            {this.props.testInModal != null ? <TestModal /> : null}
            <List bulleted>
              {this.props.testResults != null &&
                this.props.testResults.map(kidProfile => (
                  <List.Item key={kidProfile.kidProfileId}>
                    <List.Header>
                      <a onClick={() => this.props.addTestModal(kidProfile)}>
                        {"Профиль от " +
                          kidProfile.createDateTime.toLocaleDateString()}
                      </a>
                    </List.Header>
                  </List.Item>
                ))}
            </List>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  testInModal: state.testInModal,
  kidInPage: state.kidInPage,
  testResults: state.testResults
});

const mapDispatchToProps = {
  addTestModal
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileKid);
