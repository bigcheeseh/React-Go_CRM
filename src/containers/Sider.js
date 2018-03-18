import React from 'react';
import { connect } from 'react-redux';
import { sortContacts } from '../actions/index';

const Sider = ({Layout, collapsed, contacts, sortContacts, auth}) => (

    <Layout collapsed={collapsed} auth={auth} sortContacts={sortContacts}/>
)

const mapStateToProps=({auth})=>({auth})

export default connect(mapStateToProps, { sortContacts })(Sider)