import React, { Component } from 'react';
import { connect } from 'react-redux';
import { saveContact, commonSearch, updateContact } from '../actions/index';

const CrmContainer = (props) => (

        <props.Layout title={"Customers Cards"} {...props}/>
)

const mapStateToProps = ({contacts})=>{
        const { allContacts, sortedContacts } = contacts;
        
        console.log(allContacts)
        return {
                contacts: sortedContacts
            }
}

export default connect(mapStateToProps, { saveContact, commonSearch, updateContact})(CrmContainer)