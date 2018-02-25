import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Modal, Header, Button} from 'semantic-ui-react';
import {removeExerciseFromModal} from '../../../actions/exerciseInModal';

class ExerciseModal extends Component{
render(){
    let legend =
    Object.getOwnPropertyNames(this.props.exerciseInModal).length === 0
        ? "Добавить упражнение"
        : "Редактировать упражнение";
    let btnLabel = Object.getOwnPropertyNames(this.props.exerciseInModal).length === 0 ? "Добавить" : "Сохранить";
    return(
        <Modal onClose={this.props.removeExerciseFromModal} open={Boolean(this.props.exerciseInModal)}
        closeIcon>
        <Header icon='sign language' color='green' content={legend}/>
        <Modal.Content>
            ADD/EDIT EXERCISE MODAL
            </Modal.Content>
            <Button className="ui right floated button" color="green">
              {btnLabel}
            </Button>
            </Modal>
    )
}

}

const mapStateToProps=state=>({
    exerciseInModal: state.exerciseInModal
})

const mapDispatchToProps={
    removeExerciseFromModal
}

export default connect (mapStateToProps, mapDispatchToProps) (ExerciseModal);