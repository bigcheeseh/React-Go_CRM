import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
         commonSearch, 
         saveContact,
         uploadFile,
         fetchFile,
         fetchFiles,
         deleteFile,
         clearFile, 
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

class CrmContainer extends Component{
        shouldComponentUpdate = (nextProps, nextState)=>{

                if(nextProps !== this.props){
                        return true
                }

                return false
        }
        render(){
                const { props } = this;
                return(
                        <props.Layout {...props}/>
                )
        }
       
}

const mapStateToProps = ({contacts, auth, notes, links, files})=>{
        const { allContacts, sortedContacts, currentContact, extendedSearch, commonSearch} = contacts;

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

export default connect(mapStateToProps, { uploadFile, fetchFile, fetchFiles, deleteFile, clearFile, saveContact, commonSearch, updateContact, fetchContacts, importContacts, exportContacts, sortContacts, fetchContact, deleteContact, setNotes, setLinks, clearNotes, clearLinks, addNote, addLink, deleteNote, deleteLink })(CrmContainer)