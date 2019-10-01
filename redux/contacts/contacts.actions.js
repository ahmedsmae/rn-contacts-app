import ContactsActionTypes from './contacts.types';

// FETCH ALL CONTACTS
export const fetchAllContactsStart = () => ({
  type: ContactsActionTypes.FETCH_ALL_CONTACTS_START
});

export const fetchAllContactsSuccess = contacts => ({
  type: ContactsActionTypes.FETCH_ALL_CONTACTS_SUCCESS,
  payload: contacts
});

export const fetchAllContactsFailure = errorMessage => ({
  type: ContactsActionTypes.FETCH_ALL_CONTACTS_FAILURE,
  payload: errorMessage
});

// ADD CONTACT
export const addContactStart = contact => ({
  type: ContactsActionTypes.ADD_CONTACT_START,
  payload: contact
});

export const addContactSuccess = () => ({
  type: ContactsActionTypes.ADD_CONTACT_SUCCESS
});

export const addContactFailure = errorMessage => ({
  type: ContactsActionTypes.ADD_CONTACT_FAILURE,
  payload: errorMessage
});

// EDIT CONTACT
export const editContactStart = contact => ({
  type: ContactsActionTypes.EDIT_CONTACT_START,
  payload: contact
});

export const editContactSuccess = () => ({
  type: ContactsActionTypes.EDIT_CONTACT_SUCCESS
});

export const editContactFailure = errorMessage => ({
  type: ContactsActionTypes.EDIT_CONTACT_FAILURE,
  payload: errorMessage
});

// REMOVE CONTACT
export const removeContactsStart = ids => ({
  type: ContactsActionTypes.REMOVE_CONTACTS_START,
  payload: ids
});

export const removeContactsSuccess = () => ({
  type: ContactsActionTypes.REMOVE_CONTACTS_SUCCESS
});

export const removeContactsFailure = errorMessage => ({
  type: ContactsActionTypes.REMOVE_CONTACTS_FAILURE,
  payload: errorMessage
});

// FILTER CONTACTS
export const filterContacts = searchQ => ({
  type: ContactsActionTypes.FILTER_CONTACTS,
  payload: searchQ
});
