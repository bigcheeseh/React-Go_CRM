import React from 'react';
import { Layout } from 'antd';

const HeaderContainer = (props) => (
    <Layout.Header>
        <props.Layout toggle={props.toggle} collapsed={props.collapsed}/>
    </Layout.Header>
)

export default HeaderContainer;