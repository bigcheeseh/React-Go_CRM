import { combineReducers } from 'redux';
import contactReducer from './contactReducer';
import authReducer from './authReducer';
import notesReducer from './notesReducer';
import linksReducer from './linksReducer';
import fileReducer from './fileReducer';
import { reducer as reduxForm } from 'redux-form';

export default combineReducers({
   form: reduxForm,
   contacts: contactReducer,
   auth: authReducer,
   notes: notesReducer,
   links: linksReducer,
   files: fileReducer
})
