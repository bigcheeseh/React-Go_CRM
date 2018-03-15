const initialState = []

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_NOTES':
            return [...state, ...action.payload]
        case 'CLEAR_NOTES':
            return initialState
        case 'ADD_NOTE':
            return [ ...state, action.payload ]
        case 'DELETE_NOTE':

            const deleteNote = state.map(note => {

                if (note.id === action.payload.id) {
                    return null
                }


                return note
            })
            return deleteNote.filter(note=>note)
        default:
            return state
    }

}