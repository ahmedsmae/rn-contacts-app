import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase(
  'react-native-contacts.db',
  1, //version
  'Local device database contains all user saved contacts'
);

const TABLE_NAME = 'contacts';
const COL_FIRSTNAME = 'firstname';
const COL_LASTNAME = 'lastname';
const COL_EMAIL = 'email';
const COL_NUMBER_1 = 'number1';
const COL_NUMBER_2 = 'number2';
const COL_ADDRESS = 'address';
const COL_IMAGE_URI = 'imageuri';

export const init = () =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
          id INTEGER PRIMARY KEY NOT NULL, 
          ${COL_FIRSTNAME} TEXT NOT NULL, 
          ${COL_LASTNAME} TEXT NOT NULL, 
          ${COL_EMAIL} TEXT NOT NULL, 
          ${COL_NUMBER_1} TEXT NOT NULL, 
          ${COL_NUMBER_2} TEXT NOT NULL, 
          ${COL_ADDRESS} TEXT NOT NULL,
          ${COL_IMAGE_URI} TEXT NOT NULL
          );`,
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const fetchAllContacts = () =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM ${TABLE_NAME}`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const addContact = ({
  firstname,
  lastname,
  email,
  number1,
  number2,
  address,
  imageuri
}) =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `INSERT INTO ${TABLE_NAME} (${COL_FIRSTNAME}, ${COL_LASTNAME}, ${COL_EMAIL}, ${COL_NUMBER_1}, ${COL_NUMBER_2}, ${COL_ADDRESS}, ${COL_IMAGE_URI}) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        [firstname, lastname, email, number1, number2, address, imageuri],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const editContact = ({
  id,
  firstname,
  lastname,
  email,
  number1,
  number2,
  address,
  imageuri
}) =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `UPDATE ${TABLE_NAME} SET 
        ${COL_FIRSTNAME} = ?, 
        ${COL_LASTNAME} = ?, 
        ${COL_EMAIL} = ?, 
        ${COL_NUMBER_1} = ?, 
        ${COL_NUMBER_2} = ?, 
        ${COL_ADDRESS} = ?, 
        ${COL_IMAGE_URI} = ? 
        WHERE id = ?;`,
        [firstname, lastname, email, number1, number2, address, imageuri, id],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const removeContacts = ids =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DELETE FROM ${TABLE_NAME} WHERE id IN (${ids
          .map(id => '?')
          .join(',')});`,
        ids,
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });

export const dropTable = () =>
  new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        `DROP TABLE IF EXISTS ${TABLE_NAME};`,
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
