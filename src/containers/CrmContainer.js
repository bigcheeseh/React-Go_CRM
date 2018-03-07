import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveContact, commonSearch } from '../actions/index';

const CrmContainer = (props) => (

        <props.Layout title={"Customers Cards"} {...props}/>
)

const mapStateToProps = ({contacts})=>{
        const { allContacts, sortedContacts } = contacts;
        
        return {
                contacts: sortedContacts
            }
}

export default connect(mapStateToProps, { saveContact, commonSearch})(CrmContainer)