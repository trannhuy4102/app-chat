import React from 'react';

class Hello extends React.Component {
    render() {
        return (
            <div>
                <p>Hello React ! My name is {this.props.name}</p>
                <p>This App :{this.props.app}</p>
                <p>Pratice Week:{this.props.week}</p>
            </div>
        )
    }
}
export default Hello;