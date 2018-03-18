const initialState = {
    photo: {},
    esse: '',
    application: '',
    excel: '',
    fileList: [],
    uploaded: false,
    loading: false,
    file:''
}

export default function (state = initialState, action) {
    switch (action.type) {
         case 'UPLOAD_FILE_LOADING':
            return {
                ...state,
                loading: true,
        }
        
        case 'UPLOAD_FILE':
            return {
                ...state,
                uploaded: true,
            }
        case 'EXPORT_CONTACTS':
            return {
                ...state,
                excel: action.payload
            }
        case 'FETCH_PHOTO':
            return {
                ...state,
                photo: { ...state.photo, [action.payload.id]: action.payload.url},
                uploaded: false,
                loading: false
            }
       
        case 'FETCH_ESSE':
            return {
                ...state,
                esse: action.payload,
                loading: false
            }
        case 'FETCH_APPLICATION':
            return {
                ...state,
                application: action.payload,
                loading: false
            }
        case 'FETCH_FILES':
            return {
                ...state,
                uploaded: false,
                loading: false,
                fileList: [...action.payload]
            }
        case 'FETCH_FILE':
            return {
                ...state,
                uploaded: false,
                loading: false,
                file: action.payload
            }
        case 'DELETE_FILE':
            return {
                ...state,
                uploaded: true,
                loading: false
            }
       
        // case 'CLEAR_PHOTO':
        //     return {
        //         ...state,
        //         photo: ''
        //     }
        // case 'CLEAR_ESSE':
        //     return {
        //         ...state,
        //         esse: ''
        //     }
        // case 'CLEAR_APPLICATION':
        //     return {
        //         ...state,
        //         application: ''
        //     }
        
        
        default:
            return state
    }

}