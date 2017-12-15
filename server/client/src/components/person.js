import React from 'react';

const person = (props) => {
    return (<div> 
                <p>I'm a person {props.Name} and I'm {props.Age }</p>
                <p><b>{props.children}</b></p>
            </div>)
}

export default person;