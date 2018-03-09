import React, { Component } from 'react';
import { Checkbox } from 'antd';


class Note extends Component{
    state = {
        checked: false
    }

    handleChange = (e) => {
        this.props.item.checked = e.target.checked; 
        
        this.setState({ checked: e.target.checked })
        this.props.handleCheckChange(); 
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({checked: nextProps.item.checked})
    }

    render(){
        const { item } = this.props
        return (
            <div>
                <div style={{ width: "100%", padding: '0 0 10px 10px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ width: "90%", boxSizing: 'border-box', overflowWrap: 'break-word' }}>{item.content}</div>
                    <Checkbox checked={this.state.checked} onChange={this.handleChange} />
                </div>
                <span style={{ fontSize: '11px', color: '#888', padding: '0 0 0 10px' }}>{item.date}</span>
            </div>
        )
    }
}

export default Note