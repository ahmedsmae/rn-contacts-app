import { createSelector } from 'reselect';

const selectContactsReducer = state => state.contacts;

export const selectContacts = createSelector(
  [selectContactsReducer],
  contacts => contacts.contacts
);

export const selectFilteredContacts = createSelector(
  [selectContactsReducer],
  contacts => contacts.filteredContacts
);

export const selectIsLoading = createSelector(
  [selectContactsReducer],
  contacts => contacts.loading
);

export const selectErrorMessage = createSelector(
  [selectContactsReducer],
  contacts => contacts.errorMessage
);

export const selectContactById = id =>
  createSelector(
    [selectContacts],
    contacts => contacts && contacts.find(con => con.id === id)
  );
