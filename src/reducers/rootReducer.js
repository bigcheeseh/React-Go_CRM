import { combineReducers } from 'redux';
import contactReducer from './contactReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
   form: reduxForm,
   contacts: contactReducer
})
