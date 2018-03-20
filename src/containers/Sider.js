import React from 'react';
import { connect } from 'react-redux';
import { sortContacts } from '../actions/index';

const Sider = ({Layout, collapsed, contacts, sortContacts, auth, importedContacts}) => (

    <Layout collapsed={collapsed} auth={auth} sortContacts={sortContacts} importedContacts={importedContacts}/>
)

const mapStateToProps=({auth, error, contacts})=>({auth, error, importedContacts: contacts.importedContacts})

export default connect(mapStateToProps, { sortContacts })(Sider)