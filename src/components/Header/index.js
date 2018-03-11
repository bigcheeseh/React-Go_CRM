import React from 'react';
import { Avatar, Icon, Dropdown, Menu } from 'antd';
import { NavLink } from 'react-router-dom'
import './header.css';

const menu = ({auth, logout}) => {

    return (
        <Menu>
            {auth ? !auth.login ?   <Menu.Item>
                                        <NavLink to='/auth' rel="noopener noreferrer" >Войти</NavLink>     
                                    </Menu.Item>
                                    :
                                    <Menu.Item>
                                        <a onClick={()=> logout()} rel="noopener noreferrer" >Выйти</a>
                                    </Menu.Item>
            : null}

        </Menu>
    )
}


const Header = (props) => {

    return(
        <div className="header">
            <Icon
                className="trigger"
                type={props.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={props.toggle}

            />
            <div style={{display: 'flex', alignItems: 'center'}}>
                <p style={{margin: '0 5px' }}>{props.auth.email}</p>
                <Dropdown overlay={menu(props)} className="user_menu" placement="bottomLeft">
                    <Avatar icon="user" className="avatar" />
                </Dropdown>
            </div>

        </div>
    )
}

export default Header