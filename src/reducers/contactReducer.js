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
                    if(action.payload[key] && !action.payload[key].includes(contact[key]) ){
                       return null
                    }
                }
                
                return contact
            })
            
            console.log(sortState.filter(contact=>contact))

            return { ...state, sortedContacts: sortState.filter(contact=>contact) }

        case 'COMMON_SEARCH':
            if(action.payload){
                const commonSearch = state.allContacts.map(contact => {
                    for (let key in contact) {
                        if (contact[key] && contact[key] === action.payload) {
                            return contact
                        }
                    }

                    return null
                })
                return { ...state, sortedContacts: commonSearch.filter(contact => contact) }
            }

            return { ...state, sortedContacts: state.allContacts }
        
        default:
            return state
    }
}