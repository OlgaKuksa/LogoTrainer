import React, { Component } from "react";
import { connect } from "react-redux";
import { Message, Icon } from "semantic-ui-react";

class ProgressKid extends Component {
  render() {
    return (
      <div>
        {this.props.profiles.length < 3 ? (
          <Message compact color="olive">
            <Icon name="warning circle" />
            Динамику развития ребенка можно показать при наличии минимум 3
            профилей
          </Message>
        ) : (
          <div>chart placeholder</div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => ({
  profiles: state.testResults
});

export default connect(mapStateToProps, undefined)(ProgressKid);
