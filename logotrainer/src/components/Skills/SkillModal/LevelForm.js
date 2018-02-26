import React, {Component} from 'react';
import {Form, Icon} from 'semantic-ui-react';

class LevelForm extends Component{
render(){
    return(
        <Form.Group>
        <Form.Input
              type="text"
              placeholder="Уровень"
              label="Уровень"
              width={2}
              required
              defaultValue={
                this.props.level.levelNumber == undefined
                  ? ""
                  : this.props.level.levelNumber
              }
            />
            <Form.Input
              type="text"
              placeholder="Вариант ответа"
              label="Текстовое описание"
              width={14}
              required
              defaultValue={
                this.props.level.levelText == undefined
                  ? ""
                  : this.props.level.levelText
              }
            />
             <Icon name='remove circle' color='red' size='big'/>
        </Form.Group>
       
    )
}

};

export default LevelForm;