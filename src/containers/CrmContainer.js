import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd'
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
                if(nextProps.importedContacts){
                        return true
                }
                if(nextProps !== this.props){
                        return true
                }

                return false
        }

        componentWillReceiveProps = (nextProps) =>{
                if(nextProps.error && nextProps.error !== this.props.error){
                        if(typeof nextProps.error.data === 'string'){
                                message.error(nextProps.error.data, 4)
                        }
                }
        }
        render(){
                const { props } = this;
                return(
                        <props.Layout {...props}/>
                )
        }
       
}

const mapStateToProps = ({contacts, auth, notes, links, files, error, count})=>{
        const { allContacts, sortedContacts, currentContact, extendedSearch, commonSearch, importedContacts} = contacts;

        return {
                contacts: sortedContacts,
                currentContact,
                extendedSearchValue: extendedSearch,
                commonSearchValue: commonSearch,
                importedContacts,
                auth,
                notes,
                links,
                files,
                error,
                contactCount: count
            }
}

export default connect(mapStateToProps, { uploadFile, fetchFile, fetchFiles, deleteFile, clearFile, saveContact, commonSearch, updateContact, fetchContacts, importContacts, exportContacts, sortContacts, fetchContact, deleteContact, setNotes, setLinks, clearNotes, clearLinks, addNote, addLink, deleteNote, deleteLink })(CrmContainer)