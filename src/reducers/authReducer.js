const initialState = {
    login: false,
    email: '',
    token: ''
}

export default function (state = initialState, action) {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, ...action.payload }
        case 'LOGOUT':
            return { ...initialState }
        default: 
            return state
        }

}