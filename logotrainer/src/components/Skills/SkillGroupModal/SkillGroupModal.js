import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button, Header, Form} from 'semantic-ui-react';
import { removeSkillGroupModal } from "../../../actions/skillGroupInModal";

class SkillGroupModal extends Component{
    render(){
        let btnLabel = Object.getOwnPropertyNames(this.props.skillGroupInModal).length === 0 ? "Добавить" : "Сохранить";
        return(
            <Modal onClose={this.props.removeSkillGroupModal}
            open={Boolean(this.props.skillGroupInModal)}
            closeIcon>
           <Modal.Header>
            Группа навыков
            </Modal.Header>
            <Modal.Content>
                <Form>
                <Form.Input
              type="text"
              placeholder="Название группы"
              label="Название группы навыков"
              defaultValue={
                this.props.skillGroupInModal.skillGroupName == undefined
                  ? ""
                  : this.props.skillGroupInModal.skillGroupName
              }
            />
            <Button className="ui right floated button" color="green">
              {btnLabel}
            </Button>
                    </Form>
                </Modal.Content>
            </Modal>
        )
    }
};

const mapStateToProps = state => ({
    skillGroupInModal: state.skillGroupInModal
  });
  
  const mapDispatchToProps = {
    removeSkillGroupModal
  };
  
  export default connect (mapStateToProps, mapDispatchToProps) (SkillGroupModal);