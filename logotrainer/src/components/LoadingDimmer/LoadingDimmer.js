import React, { Component } from "react";
import { Dimmer, Loader, Segment } from "semantic-ui-react";

class LoadingDimmer extends Component {
  render() {
    return (
      <div>
        <Dimmer active>
          <Loader>Загрузка данных... Ещё чуть-чуть, и можно работать</Loader>
        </Dimmer>
      </div>
    );
  }
}

export default LoadingDimmer;
