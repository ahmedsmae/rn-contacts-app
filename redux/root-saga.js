import { all, call } from 'redux-saga/effects';

// import all sagas
import contactsSagas from './contacts/contacts.sagas';

export default function* rootSaga() {
  yield all([
    // add all sagas
    call(contactsSagas)
  ]);
}
