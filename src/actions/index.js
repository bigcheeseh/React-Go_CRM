import{ 
        SAVE_CONTACT, 
        FILTR_CONTACTS, 
        FETCH_CONTACTS,
        FETCH_CONTACT,
        EXPORT_CONTACTS,
        IMPORT_CONTACTS, 
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
        EXPORT_CONTACTS_ERROR,
        IMPORT_CONTACTS_ERROR, 
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

const API = 'https://simplecrmonline.cloud/api'

export const fetchContacts = (token, row_count, offset, sorted, filtred) => (dispatch) => {
    
    let group_id;
    if (filtred && filtred.group_id){

        group_id = filtred.group_id.map(group=>{

            if(typeof group === 'object'){
                return group.id
            }

            return group
        })
    }


    axios(
            {
                method: 'get',
                url: `${API}/contacts`,
                headers: {'X-CSRF-Token': token},
                params:{
                    row_count,
                    offset,
                    sort:      sorted.length > 0 && sorted[0].id !== 'photo' ? `${sorted[0].id} ${sorted[0].desc ? "desc":"asc"}` : '',
                    any_field: filtred && filtred.any_field   ? filtred.any_field : null,
                    name:      filtred && filtred.name        ? filtred.name : null,
                    group_id:  filtred && group_id            ? group_id.join(',') : null,
                    industry:  filtred && filtred.industry    ? filtred.industry : null,
                    company:   filtred && filtred.company     ? filtred.company : null,
                    position:  filtred && filtred.position    ? filtred.position : null,
                    city:      filtred && filtred.city        ? filtred.city : null,
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

export const importContacts = (file, token) => (dispatch) => {

    let fileFormData = new FormData();
    fileFormData.append('файл', file)


    axios(
        {
            method: 'post',
            url: `${API}/contacts`,
            headers: {'X-CSRF-Token': token, 'Content-Type': 'multipart/form-data' },
            data: fileFormData

        }
    )
        .then((response) => {


            dispatch({ type: IMPORT_CONTACTS, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: IMPORT_CONTACTS_ERROR, payload: error })
        })

}


export const exportContacts = (token, sorted, filtred) => (dispatch) => {
    let group_id;
    if (filtred && filtred.group_id){

        group_id = filtred.group_id.map(group=>{

            if(typeof group === 'object'){
                return group.id
            }

            return group
        })
    }
    axios(
            {
                method: 'get',
                url: `${API}/export`,
                headers: { 'X-CSRF-Token': token },
                responseType: 'arraybuffer',
                params: {

                    sort:       sorted  && sorted.length > 0 && sorted[0].id !== "group_name" ? `${sorted[0].id} ${sorted[0].desc ? "desc" : "asc"}` : null,
                    any_field:  filtred && filtred.any_field ? filtred.any_field : null,
                    name:       filtred && filtred.name      ? filtred.name : null,
                    group_id:   filtred && group_id          ? group_id.join(',') : null,
                    industry:   filtred && filtred.industry  ? filtred.industry : null,
                    company:    filtred && filtred.company   ? filtred.company : null,
                    position:   filtred && filtred.position  ? filtred.position : null,
                    city:       filtred && filtred.city      ? filtred.city : null,
                }
            }
        )
        .then((response) => {
           
                const arrayBufferView = new Uint8Array(response.data);
                const blob = new Blob([arrayBufferView], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
                const urlCreator = window.URL || window.webkitURL



            dispatch({ type: EXPORT_CONTACTS, payload: urlCreator.createObjectURL(blob) })
        })
        .catch((error) => {

            dispatch({ type: EXPORT_CONTACTS_ERROR, payload: error })
        })

}

export const fetchContact = (token, id) => (dispatch) => {

    axios(
            {
                method: 'get',
                url: `${API}/contacts/${id}`,
                headers: { 'X-CSRF-Token': token },
            
            }
        )
        .then((response) => {


            dispatch({ type: FETCH_CONTACT, payload: response.data })
        })
        .catch((error) => {

            dispatch({ type: FETCH_CONTACT_ERROR, payload: error })
        })

}

export const saveContact = (contact, token)=>(dispatch)=>{
    

    contact = { ...contact, application: '', esse: '', notes: [], links: []}

    axios(
            {
                method: 'post',
                url: `${API}/contacts`,
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

    dispatch({ type: FILTR_CONTACTS, payload: fields })
}

export const commonSearch = ( field ) => (dispatch) => {
    const search = {}
    search.any_field = field

    dispatch({ type: COMMON_SEARCH, payload: search })
}

export const updateContact = (contact, token, id) => (dispatch) => {

    contact = { ...contact,  photo: '',application: '', esse: '', notes: [], links: [] }
    axios(
            {
                method: 'post',
                url: `${API}/contacts/${id}`,
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
                url: `${API}/contacts/${id}`,
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

    let fileFormData = new FormData();
    fileFormData.append(fileName, file)

    if(fileType){
        fileFormData.append('field', fileType)
    }

    dispatch({ type: 'UPLOAD_FILE_LOADING' })

    axios(
            {
                method: 'post',
                url: `${API}/contacts/${id}/files`,
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

export const fetchFiles = (token, id) => (dispatch) => {

        axios(
                {
                    method: 'get',
                    url: `${API}/contacts/${id}/files`,
                    headers: {
                        'X-CSRF-Token': token
                    }
                }
            )
            .then((response) => {

                dispatch({ type: `FETCH_FILES`, payload:response.data.files})
  
                
            })
            .catch((error) => {

                dispatch({ type: 'FETCH_FILES_ERROR', payload: error })
            })
    

}

export const fetchFile = (fileName, fileType, token, id) => (dispatch) => {

        axios(
                {
                    method: 'get',
                    url: `${API}/contacts/${id}/files/${fileName}`,
                    headers: {
                        'X-CSRF-Token': token
                    },
                    responseType: 'arraybuffer'
                }
            )
            .then((response) => {

                

                const arrayBufferView = new Uint8Array(response.data);
                const blob = new Blob([arrayBufferView])
                const urlCreator = window.URL || window.webkitURL
                dispatch({ type: `FETCH_${fileType}`, payload:{url: urlCreator.createObjectURL(blob), id, name: fileName}})
             
                
            })
            .catch((error) => {

                dispatch({ type: 'FETCH_FILE_ERROR', payload: error })
            })
    

}

export const deleteFile = (fileName, token, id) => (dispatch) => {


    axios(
            {
                method: 'delete',
                url: `${API}/contacts/${id}/files/${fileName}`,
                headers: {
                    'X-CSRF-Token': token
                }
            }
        )
        .then((response) => {

            dispatch({ type: `DELETE_FILE` })
        })
        .catch((error) => {

            dispatch({ type: 'DELETE_FILE_ERROR', payload: error })
        })

}

export const clearFile = (fileType) => (dispatch) => {

    dispatch({ type: `CLEAR_${fileType}`})
      
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
                url: `${API}/contacts/${id}/notes`,
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
    
    axios(
            {
                method:'delete',
                url: `${API}/contacts/${id}/notes/${noteId}`,
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
   
    axios(
            {
                method:'post',
                url: `${API}/contacts/${id}/links`,
                headers:{'X-CSRF-Token': token, 'Content-Type': 'application/json' },
                data: link
            }
        )
        .then((response) => {

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
                url: `${API}/contacts/${id}/links/${linkId}`,
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
                url: `${API}/login`, 
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
