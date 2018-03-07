import React from 'react';
import { connect } from 'react-redux';
import { sortContacts } from '../actions/index';

const Sider = ({Layout, collapsed, contacts, sortContacts}) => (

    <Layout collapsed={collapsed} sortContacts={sortContacts}/>
)


export default connect(null, { sortContacts })(Sider)