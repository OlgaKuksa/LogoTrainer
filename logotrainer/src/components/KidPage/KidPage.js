import React, {Component} from 'react';
import {Icon, Button} from 'semantic-ui-react';
import {clearKidPage} from '../../actions/kidInPage';
import {connect} from 'react-redux';

class KidPage extends Component{
render(){
    return(
        <div>
        <Button color='olive' onClick={this.props.clearKidPage}>
        <Icon name='arrow left'/>
        </Button>
            {this.props.kidInPage.firstName} {this.props.kidInPage.lastName} Info about the child will be here
        </div>
    )
}
}

const mapStateToProps=(state)=>({
    kidInPage:state.kidInPage
});

const mapDispatchToProps={
    clearKidPage
}

export default connect (mapStateToProps, mapDispatchToProps) (KidPage);