const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_LINKS':
            return [...state, ...action.payload]
        case 'CLEAR_LINKS':
            return initialState
        case 'ADD_LINK':
            return [...state, action.payload]
        case 'DELETE_LINK':

            const deleteLink = state.map(link => {

                if (link.id === action.payload.id) {
                    return null
                }


                return link
            })
            return deleteLink.filter(link => link)
        default:
            return state
    }

}