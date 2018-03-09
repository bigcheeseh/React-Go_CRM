import React from 'react';
import { Avatar, Icon } from 'antd';
import { NavLink } from 'react-router-dom'
import './header.css';


const Header = (props) => (
    <div className="header">
        <Icon
            className="trigger"
            type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={props.toggle}

        />
        <NavLink to='/auth'><Avatar icon="user" className="avatar" /></NavLink>
    </div>
) 

export default Header