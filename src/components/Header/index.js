import React from 'react';
import { Avatar, Icon, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import './header.css';

const menu = (
    <Menu>
        <Menu.Item>
            <NavLink to='/auth'rel="noopener noreferrer" >1st menu item</NavLink>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">2nd menu item</a>
        </Menu.Item>
        <Menu.Item>
            <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">3rd menu item</a>
        </Menu.Item>
    </Menu>
);


const Header = (props) => (
    <div className="header">
        <Icon
            className="trigger"
            type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={props.toggle}

        />
        <Dropdown overlay={menu} placement="bottomLeft">
            <Avatar icon="user" className="avatar" />
        </Dropdown>
    </div>
) 

export default Header