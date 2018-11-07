import React from 'react';

class Field extends React.Component {
    state = {
        value: ''
    }

    handleChange = e => {
        this.setState({ value: e.target.value });
    }
    render() {
        const { value } = this.state;
        return (
            <React.Fragment>
                <label htmlFor={this.props.for}>{this.props.label}</label>
                <input type="text" name={this.props.name} value={value} onChange={() => this.handleChange} />
            </React.Fragment>
        );
    }
}

export default Field;