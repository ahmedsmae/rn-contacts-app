import { takeLatest, call, put, all } from 'redux-saga/effects';
import * as FileSystem from 'expo-file-system';
import Toast from 'react-native-root-toast';

import ContactsActionTypes from './contacts.types';
import {
  fetchAllContactsSuccess,
  fetchAllContactsFailure,
  addContactSuccess,
  addContactFailure,
  editContactSuccess,
  editContactFailure,
  removeContactsSuccess,
  removeContactsFailure
} from './contacts.actions';
import {
  fetchAllContacts,
  addContact,
  editContact,
  removeContacts
} from '../../helpers/db';

function* fetchContactsAsync() {
  try {
    const response = yield call(fetchAllContacts);

    yield put(fetchAllContactsSuccess(response.rows._array));
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(fetchAllContactsFailure(err.message));
  }
}

function* addContactAsync({ payload }) {
  const { imageuri, ...otherProps } = payload;
  const fileName = imageuri.split('/').pop();
  const newPath = FileSystem.documentDirectory + fileName;

  try {
    if (fileName) {
      yield call(FileSystem.moveAsync, {
        from: imageuri,
        to: newPath
      });

      yield call(addContact, { ...otherProps, imageuri: newPath });
    } else {
      yield call(addContact, { ...otherProps, imageuri: '' });
    }

    yield put(addContactSuccess());
    Toast.show('Contact saved successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.LONG
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(addContactFailure(err.message));
  }
}

function* editContactAsync({ payload }) {
  try {
    yield call(editContact, payload);

    yield put(editContactSuccess());
    Toast.show('Contact edited successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.LONG
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(editContactFailure(err.message));
  }
}

function* removeContactsAsync({ payload }) {
  try {
    yield call(removeContacts, payload);

    yield put(removeContactsSuccess());
    Toast.show('Contact removed successfully', {
      backgroundColor: 'green',
      duration: Toast.durations.LONG
    });
  } catch (err) {
    Toast.show(err.message, {
      backgroundColor: 'red',
      duration: Toast.durations.LONG
    });
    yield put(removeContactsFailure(err.message));
  }
}

function* fetchContactsStart() {
  yield takeLatest(
    ContactsActionTypes.FETCH_ALL_CONTACTS_START,
    fetchContactsAsync
  );
}

function* addContactStart() {
  yield takeLatest(ContactsActionTypes.ADD_CONTACT_START, addContactAsync);
}

function* reloadContactsAfterAdd() {
  yield takeLatest(ContactsActionTypes.ADD_CONTACT_SUCCESS, fetchContactsAsync);
}

function* editContactStart() {
  yield takeLatest(ContactsActionTypes.EDIT_CONTACT_START, editContactAsync);
}

function* reloadContactsAfterEdit() {
  yield takeLatest(
    ContactsActionTypes.EDIT_CONTACT_SUCCESS,
    fetchContactsAsync
  );
}

function* removeContactsStart() {
  yield takeLatest(
    ContactsActionTypes.REMOVE_CONTACTS_START,
    removeContactsAsync
  );
}

function* reloadContactsAfterRemove() {
  yield takeLatest(
    ContactsActionTypes.REMOVE_CONTACTS_SUCCESS,
    fetchContactsAsync
  );
}

export default function* publicItemsSagas() {
  yield all([
    call(fetchContactsStart),
    call(addContactStart),
    call(reloadContactsAfterAdd),
    call(editContactStart),
    call(reloadContactsAfterEdit),
    call(removeContactsStart),
    call(reloadContactsAfterRemove)
  ]);
}
