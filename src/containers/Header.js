import React from 'react';
import { Layout } from 'antd';
import { connect } from 'react-redux';
import { logout } from '../actions/index';

const HeaderContainer = (props) => (
    <Layout.Header>
        <props.Layout {...props}/>
    </Layout.Header>
)

const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, { logout })(HeaderContainer);