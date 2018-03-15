import React, { Component } from 'react';
import { Checkbox } from 'antd';


class Link extends Component{
    state = {
        checked: false
    }

    handleChange = (e) => {
        this.props.item.checked = e.target.checked; 
        
        this.setState({ checked: e.target.checked }, () => this.props.handleCheckChange());
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({checked: nextProps.item.checked})
    }

    render(){
        const { item } = this.props
        return (
            <div>
                <div style={{ width: "100%", padding: '0 0 0 10px', boxSizing: 'border-box', display: 'flex', justifyContent: 'space-between' }} >
                    <div style={{ width: "90%", boxSizing: 'border-box', overflowWrap: 'break-word', display: 'flex', flexDirection: 'column' }}>
                        <label htmlFor="link">{item.name}</label>
                        <a id="link" href={item.addr} target="_blank">{item.addr}</a>
                    </div>
                    <Checkbox checked={this.state.checked} onChange={this.handleChange} />
                </div>
                <span style={{ fontSize: '11px', color: '#888', padding: '0 0 0 10px' }}>{item.created}</span>
            </div>
        )
    }
}

export default Link