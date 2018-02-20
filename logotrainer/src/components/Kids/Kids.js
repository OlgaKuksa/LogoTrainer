import React, {Component} from 'react';
import {Card, CardGroup, Icon} from 'semantic-ui-react';
import "semantic-ui-css/semantic.min.css";


class Kids extends Component {
    kids=[{
        firstName:'Иванов',
        lastName:'Егор',
        dateOfBirth:'2012-05-19',
        group:6
    },
    {
        firstName:'Семенова',
        lastName:'Анастасия',
        dateOfBirth:'2012-03-15',
        group:4
    },
    {
        firstName:'Шаров',
        lastName:'Иван',
        dateOfBirth:'2011-12-24',
        group:6
    },
];

groups=[1,2,3,4,5,6];

    render(){
        return(
            <div>
            <CardGroup itemsPerRow={5} className='ui link cards'>
                {this.kids.map((item,index)=>
                (<Card key={index} color='olive'>
                    <Card.Content>
                        <Card.Header>{item.firstName} {item.lastName}</Card.Header>
                        <Card.Meta>Дата рождения: {item.dateOfBirth}</Card.Meta>
                        <Card.Description>Группа {item.group}</Card.Description>
                        </Card.Content>
                </Card>
                ))}
                <Card>
                <Card.Content textAlign='center'>
                   <Icon name='add user' size='huge' color='olive'/>
                </Card.Content>
                    </Card>
                </CardGroup>

            </div>
        )
    }
}

export default Kids;