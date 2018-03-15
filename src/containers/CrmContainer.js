import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
         commonSearch, 
         saveContact,
         uploadFile, 
         updateContact, 
         fetchContacts, 
         fetchContact, 
         deleteContact, 
         setNotes, 
         setLinks, 
         clearNotes, 
         clearLinks, 
         addNote, 
         addLink, 
         deleteNote, 
         deleteLink 
        } from '../actions/index';

const CrmContainer = (props) => {
        

        return(
                <props.Layout {...props}/>
        )
       
}

const mapStateToProps = ({contacts, auth, notes, links})=>{
        const { allContacts, sortedContacts, currentContact } = contacts;
        
        console.log(allContacts)
        return {
                contacts: sortedContacts,
                currentContact,
                auth,
                notes,
                links
            }
}

export default connect(mapStateToProps, { uploadFile, saveContact, commonSearch, updateContact, fetchContacts, fetchContact, deleteContact, setNotes, setLinks, clearNotes, clearLinks, addNote, addLink, deleteNote, deleteLink })(CrmContainer)