import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Button} from 'semantic-ui-react';
import {addExerciseToModal} from '../../actions/exerciseInModal';
import ExerciseModal from '../ExerciseModal'

class Exercises extends Component {
render(){
    return(
        <div>
        <Button onClick={()=>this.props.addExerciseToModal({})}>
            Добавить
        </Button>
        {this.props.exerciseInModal==null?null:(<ExerciseModal/>)}
        </div>
    )
}
};

const mapStateToProps=state=>({
    exerciseInModal:state.exerciseInModal
});

const mapDispatchToProps={
    addExerciseToModal
}



export default connect (mapStateToProps, mapDispatchToProps)(Exercises);