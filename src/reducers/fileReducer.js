const initialState = {
    photo: '',
    esse: '',
    application: '',
    files: []
}

export default function (state = initialState, action) {
    switch (action.type) {

        case 'FETCH_PHOTO':
            return {
                ...state,
                photo: action.payload
            }
        case 'FETCH_ESSE':
            return {
                ...state,
                esse: action.payload
            }
        case 'FETCH_APPLICATION':
            return {
                ...state,
                application: action.payload
            }
        case 'FETCH_FILES':
            return {
                ...state,
                files: [...action.payload]
            }
        case 'DELETE_PHOTO':
            return {
                ...state,
                photo: ''
            }
        case 'DELETE_ESSE':
            return {
                ...state,
                esse: ''
            }
        case 'DELETE_APPLICATION':
            return {
                ...state,
                application: ''
            }
        
        
        default:
            return state
    }

}