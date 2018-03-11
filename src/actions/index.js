import { SAVE_CONTACT, SORT_CONTACTS, FETCH_CONTACTS, COMMON_SEARCH, UPDATE_CONTACT, LOGIN, LOGOUT } from './types.js';


export const saveContact = (contact)=>(dispatch)=>{

    dispatch({type: SAVE_CONTACT, payload: contact})
}

export const sortContacts = ( fields )=>(dispatch)=>{
    dispatch({ type: SORT_CONTACTS, payload: fields })
}

export const commonSearch = ( field ) => (dispatch) => {
    dispatch({ type: COMMON_SEARCH, payload: field })
}

export const updateContact = (contact) => (dispatch) => {

    dispatch({ type: UPDATE_CONTACT, payload: contact })
}


export const login = (values) =>(dispatch)=>{

    dispatch({ type: LOGIN, payload: {login: true, ...values} })
}

export const logout = () => (dispatch) => {

    dispatch({ type: LOGOUT, payload: { login: false } })
}
