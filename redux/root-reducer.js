import { combineReducers } from 'redux';

// import all reducers
import contactsReducer from './contacts/contacts.reducer';

const rootReducer = combineReducers({
  // add all reducers
  contacts: contactsReducer
});

export default rootReducer;
