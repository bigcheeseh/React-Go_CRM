const initialState =  {
    allContacts: [],
    sortedContacts: []
}

export default function(state=initialState, action){
    switch(action.type){
        case 'SAVE_CONTACT':
            return {
                allContacts: [...state.allContacts, action.payload],
                sortedContacts: [...state.allContacts, action.payload]
            }
        case 'SORT_CONTACTS':
        const sortState = state.allContacts.map(contact=>{
            for(let key in action.payload){
                    if (action.payload[key] && key !== 'group' && action.payload[key].toLowerCase().trim() !== contact[key].toLowerCase().trim() ){
                       return null
                    } else if (action.payload[key] && key === 'group' && !action.payload[key].includes(contact[key])) {
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

                return { allContacts: update, sortedContacts: update }
           
        
        default:
            return state
    }
}