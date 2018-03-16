import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
         commonSearch, 
         saveContact,
         uploadFile,
         fetchFile,
         deleteFile, 
         updateContact, 
         fetchContacts, 
         fetchContact,
         exportContacts,
         importContacts,
         sortContacts, 
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

const mapStateToProps = ({contacts, auth, notes, links, files})=>{
        const { allContacts, sortedContacts, currentContact, extendedSearch, commonSearch} = contacts;
        
        console.log(allContacts)
        return {
                contacts: sortedContacts,
                currentContact,
                extendedSearchValue: extendedSearch,
                commonSearchValue: commonSearch,
                auth,
                notes,
                links,
                files
            }
}

export default connect(mapStateToProps, { uploadFile, fetchFile, deleteFile, saveContact, commonSearch, updateContact, fetchContacts, importContacts, exportContacts, sortContacts, fetchContact, deleteContact, setNotes, setLinks, clearNotes, clearLinks, addNote, addLink, deleteNote, deleteLink })(CrmContainer)