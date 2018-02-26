import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Button} from 'semantic-ui-react';
import { removeSkillGroupModal } from "../../../actions/skillGroupInModal";

class SkillGroupModal extends Component{
    render(){
        return(
            <Modal onClose={this.props.removeSkillGroupModal}
            open={Boolean(this.props.skillGroupInModal)}
            closeIcon>
            Skill GROUP Modal 
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