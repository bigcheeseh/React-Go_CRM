import { SAVE_CONTACT, SORT_CONTACTS, FETCH_CONTACTS, COMMON_SEARCH } from './types.js';


export const saveContact = (contact)=>(dispatch)=>{

    dispatch({type: SAVE_CONTACT, payload: contact})
}

export const sortContacts = ( fields )=>(dispatch)=>{
    dispatch({ type: SORT_CONTACTS, payload: fields })
}

export const commonSearch = ( field ) => (dispatch) => {
    dispatch({ type: COMMON_SEARCH, payload: field })
}