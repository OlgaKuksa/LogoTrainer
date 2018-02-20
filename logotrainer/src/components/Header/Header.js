import React, {Component } from "react";
import { Label, Icon } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import './Header.css'

class Header extends Component {
  render() {
    return (
        <Label color='olive' className='rightFloat'>
        <Icon name='settings'/>
            Добро пожаловать, Логопед!
            <Label.Detail>Выход</Label.Detail>
            </Label>
    );
  }
}

export default Header;
