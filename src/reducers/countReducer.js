const initialState = 0

export default function (state = initialState, action) {
    switch (action.type) {
        case 'COUNT':
            return action.payload
        default:
            return state
    }

}