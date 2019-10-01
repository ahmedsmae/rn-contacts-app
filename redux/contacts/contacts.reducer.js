import ContactsActionTypes from './contacts.types';

const INITIAL_STATE = {
  contacts: [],
  filteredContacts: [],
  loading: false,
  errorMessage: ''
};

const contactsReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case ContactsActionTypes.FETCH_ALL_CONTACTS_START:
    case ContactsActionTypes.ADD_CONTACT_START:
    case ContactsActionTypes.EDIT_CONTACT_START:
    case ContactsActionTypes.REMOVE_CONTACTS_START:
      return {
        ...state,
        loading: true,
        errorMessage: ''
      };

    case ContactsActionTypes.FETCH_ALL_CONTACTS_SUCCESS:
      return {
        ...state,
        contacts: payload,
        filteredContacts: payload,
        errorMessage: '',
        loading: false
      };

    // case ContactsActionTypes.ADD_CONTACT_SUCCESS:
    // case ContactsActionTypes.EDIT_CONTACT_SUCCESS:
    // case ContactsActionTypes.REMOVE_CONTACTS_SUCCESS:

    case ContactsActionTypes.FETCH_ALL_CONTACTS_FAILURE:
    case ContactsActionTypes.ADD_CONTACT_FAILURE:
    case ContactsActionTypes.EDIT_CONTACT_FAILURE:
    case ContactsActionTypes.REMOVE_CONTACTS_FAILURE:
      return {
        ...state,
        errorMessage: payload,
        loading: false
      };

    case ContactsActionTypes.FILTER_CONTACTS:
      return {
        ...state,
        filteredContacts: state.contacts.filter(({ firstname, lastname }) => {
          const fullname = firstname + lastname;
          return fullname.toLowerCase().includes(payload.toLowerCase());
        })
      };

    default:
      return state;
  }
};

export default contactsReducer;
