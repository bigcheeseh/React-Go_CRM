import{ 
        SAVE_CONTACT, 
        SORT_CONTACTS, 
        FETCH_CONTACTS,
        FETCH_CONTACT, 
        DELETE_CONTACT,
        COMMON_SEARCH,
        UPLOAD_FILE,
        ADD_LINK,
        ADD_NOTE,
        SET_NOTES,
        SET_LINKS, 
        CLEAR_NOTES,
        CLEAR_LINKS,
        UPDATE_CONTACT, 
        LOGIN, LOGOUT, 
        FETCH_CONTACTS_ERROR,
        FETCH_CONTACT_ERROR, 
        SAVE_CONTACT_ERROR, 
        UPDATE_CONTACT_ERROR, 
        DELETE_CONTACT_ERROR,
        UPLOAD_FILE_ERROR,
        ADD_LINK_ERROR,
        ADD_NOTE_ERROR,
        DELETE_NOTE,
        DELETE_LINK,
        DELETE_LINK_ERROR,
        DELETE_NOTE_ERROR
    } from './types.js';


import axios from 'axios';

export const fetchContacts = (token, row_count, offset, sorted, filtred) => (dispatch) => {
   
    axios(
            {
                method: 'get',
                url: 'http://80.211.159.16:8090/contacts',
                headers: {'X-CSRF-Token': token},
                params:{
                    row_count,
                    offset,
                    sort: sorted.length > 0 ? `${sorted[0].id} ${sorted[0].desc ? "desc":"asc"}` : '',
                    any_field: filtred ? filtred : ''
                }
            }
        )
        .then((response) => {

            dispatch({ type: FETCH_CONTACTS, payload: response.data.contacts })
        })
        .catch((error) => {

            dispatch({ type: FETCH_CONTACTS_ERROR, payload: error })
        })

}

export const fetchContact = (token, id) => (dispatch) => {

    axios(
            {
                method: 'get',
                url: `http://80.211.159.16:8090/contacts/${id}`,
                headers: { 'X-CSRF-Token': token },
            
            }
        )
        .then((response) => {

            console.log(response)

            dispatch({ type: FETCH_CONTACT, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: FETCH_CONTACT_ERROR, payload: error })
        })

}

export const saveContact = (contact, token)=>(dispatch)=>{
    

    contact = { ...contact, photo: '', application: '', esse: '', notes: [], links: []}

    axios(
            {
                method: 'post',
                url: 'http://80.211.159.16:8090/contacts',
                headers: { 'X-CSRF-Token': token, 'Content-Type': 'application/json' },
                data: contact
            }
        )
        .then((response) => {

            dispatch({ type: SAVE_CONTACT, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: SAVE_CONTACT_ERROR, payload: error })
        })


}

export const sortContacts = ( fields )=>(dispatch)=>{
    dispatch({ type: SORT_CONTACTS, payload: fields })
}

export const commonSearch = ( field ) => (dispatch) => {
    dispatch({ type: COMMON_SEARCH, payload: field })
}

export const updateContact = (contact, token, id) => (dispatch) => {

    console.log(id, 'id', contact, token)
    axios(
            {
                method: 'post',
                url: `http://80.211.159.16:8090/contacts/${id}`,
                headers: {'X-CSRF-Token': token, 'Content-Type': 'application/json' },
                data: contact
            }
        )
        .then((response) => {

            dispatch({ type: UPDATE_CONTACT, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: UPDATE_CONTACT_ERROR, payload: error })
        })

}


export const deleteContact = (token, id) => (dispatch) => {

    axios(
            {
                method: 'delete',
                url: `http://80.211.159.16:8090/contacts/${id}`,
                headers: { 'X-CSRF-Token': token }
            }
        )
        .then((response) => {

            dispatch({ type: DELETE_CONTACT, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: DELETE_CONTACT_ERROR, payload: error })
        })

}

export const uploadFile = (file, fileName, fileType, token, id) => (dispatch) => {
    
    console.log(file, fileName, fileType, token, id)

    let fileFormData = new FormData();
    fileFormData.append(fileName, file)

    if(fileType){
        fileFormData.append('field', fileType)
    }
    console.log(fileFormData)
    axios(
        {
            method: 'post',
            url: `http://80.211.159.16:8090/contacts/${id}/files`,
            data:fileFormData,
            headers: {
                'X-CSRF-Token': token, 'Content-Type': 'multipart/form-data' 
            }
        }
    )
        .then((response) => {

            dispatch({ type: UPLOAD_FILE })
        })
        .catch((error) => {

            dispatch({ type: UPLOAD_FILE_ERROR, payload: error })
        })

}

export const setNotes = (notes) => (dispatch) => {
    

        dispatch({ type: SET_NOTES, payload: notes })
        
} 

export const setLinks = (links) => (dispatch) => {


    dispatch({ type: SET_LINKS, payload: links })
}

export const clearNotes = () => (dispatch) => {


    dispatch({ type: CLEAR_NOTES })

}

export const clearLinks = () => (dispatch) => {


    dispatch({ type: CLEAR_LINKS })

} 


export const addNote = (note, token, id) => (dispatch) =>{
    axios(
            {
                method:'post',
                url: `http://80.211.159.16:8090/contacts/${id}/notes`,
                headers:{'X-CSRF-Token': token, 'Content-Type': 'application/json' },
                data: note
            }
        )
        .then((response) => {

            dispatch({ type: ADD_NOTE, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: ADD_NOTE_ERROR, payload: error })
        })
} 
export const deleteNote = (token, id, noteId) => (dispatch) =>{
    console.log(token, id, noteId)
    axios(
            {
                method:'delete',
                url: `http://80.211.159.16:8090/contacts/${id}/notes/${noteId}`,
                headers:{'X-CSRF-Token': token}
            }
        )
        .then((response) => {

            dispatch({ type: DELETE_NOTE, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: DELETE_NOTE_ERROR, payload: error })
        })
}
export const addLink = (link, token, id) => (dispatch) =>{
    console.log(link, token, id)
    axios(
            {
                method:'post',
                url: `http://80.211.159.16:8090/contacts/${id}/links`,
                headers:{'X-CSRF-Token': token, 'Content-Type': 'application/json' },
                data: link
            }
        )
        .then((response) => {
            console.log(response.data)
            dispatch({ type: ADD_LINK, payload: response.data })
        })
        .catch((error) => {
            dispatch({ type: ADD_LINK_ERROR, payload: error })
        })
}
export const deleteLink = (token, id, linkId) => (dispatch) =>{
    axios(
            {
                method:'delete',
                url: `http://80.211.159.16:8090/contacts/${id}/links/${linkId}`,
                headers:{'X-CSRF-Token': token}
            }
        )
        .then((response) => {

            dispatch({ type: DELETE_LINK, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: DELETE_LINK_ERROR, payload: error })
        })
}

export const login = (values) =>(dispatch)=>{

    axios( 
            {  
                method: 'post', 
                url: 'http://80.211.159.16:8090/login', 
                data: {
                    user_name: values.name, 
                    password: values.password
                }
            }
        )
        .then((response)=>{

            dispatch({ type: LOGIN, payload: {login: true, token: response.data.token, name: values.name, error: false } })
        })
        .catch((error)=>{

            dispatch({ type: LOGIN, payload: { login: false, error} })
        })
}

export const logout = () => (dispatch) => {

    dispatch({ type: LOGOUT, payload: { login: false } })
}
