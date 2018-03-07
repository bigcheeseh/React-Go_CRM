import React from 'react';
import { Avatar, Icon } from 'antd';
import './header.css';


const Header = (props) => (
    <div className="header">
        <Icon
            className="trigger"
            type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={props.toggle}
        />
        <p><Avatar icon="user" className="avatar"/></p>
    </div>
) 

export default Header