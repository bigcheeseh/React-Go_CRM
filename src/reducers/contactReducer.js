const initialState =  {
    allContacts: [],
    sortedContacts: [],
    currentContact: {},
    extendedSearch:{},
    commonSearch:{},
    importedContacts: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case 'SAVE_CONTACT':
            return {
                ...state,
                allContacts: [...state.allContacts, action.payload],
                sortedContacts: [...state.allContacts, action.payload],
                currentContact: action.payload
            }
        case 'FETCH_CONTACTS':
            return {
                ...state,
                allContacts: action.payload,
                sortedContacts: action.payload
            }
        case 'FETCH_CONTACT':
            return {
                ...state,
                currentContact: action.payload,
            }
        case 'FILTR_CONTACTS':   
            
            return { ...state, extendedSearch: action.payload, commonSearch: {} }
        case 'IMPORT_CONTACTS':

            return { ...state, importedContacts: {...action.payload}}

        case 'COMMON_SEARCH':
            

            return { ...state, commonSearch: action.payload, extendedSearch: {} }

        case 'UPDATE_CONTACT':

                const update = state.allContacts.map(contact => {
            
                        if (contact.id === action.payload.id) {
                            return action.payload
                        }
                    

                    return contact
                })

                return { ...state, allContacts: update, sortedContacts: update }
        case 'DELETE_CONTACT':

            const deleteContact = state.allContacts.map(contact => {

                if (contact.id === action.payload.id) {
                    return null
                }


                return contact
            })

            return { ...state, allContacts: deleteContact.filter(contact => contact), sortedContacts: deleteContact.filter(contact => contact) }
           
        
        default:
            return state
    }
}