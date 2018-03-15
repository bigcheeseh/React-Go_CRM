const initialState =  {
    allContacts: [],
    sortedContacts: [],
    currentContact: {}
}

export default function(state=initialState, action){
    switch(action.type){
        case 'SAVE_CONTACT':
            return {
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
        case 'SORT_CONTACTS':
            const sortState = state.allContacts.map(contact=>{
                for(let key in action.payload){
                        if (action.payload[key] && key !== 'group_name' && action.payload[key].toLowerCase().trim() !== contact[key].toLowerCase().trim() ){
                        return null
                        } else if (action.payload[key] && key === 'group_name' && !action.payload[key].includes(contact[key])) {
                            return null
                        }
                    }
                    
                return contact
            })

            return { ...state, sortedContacts: sortState.filter(contact=>contact) }

        case 'COMMON_SEARCH':
            if(action.payload){
                const commonSearch = state.allContacts.map(contact => {
                    for (let key in contact) {
                        if (contact[key] && typeof contact[key] === "string"){
                            if (contact[key].toLowerCase().trim() === action.payload.toLowerCase().trim()) {
                                return contact
                            }
                        }else if (contact[key] && contact[key] === action.payload) {
                            return contact
                        }
                    }

                    return null
                })
                return { ...state, sortedContacts: commonSearch.filter(contact => contact) }
            }

            return { ...state, sortedContacts: state.allContacts }

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