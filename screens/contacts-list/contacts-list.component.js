import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FlatList, View, Vibration } from 'react-native';
import { FAB, List, Avatar, Divider } from 'react-native-paper';

import { selectFilteredContacts } from '../../redux/contacts/contacts.selectors';
import {
  fetchAllContactsStart,
  removeContactsStart,
  filterContacts
} from '../../redux/contacts/contacts.actions';

import DefaultUserImage from '../../assets/user.png';

import navOptions from './contacts-list.navoptions';
import styles from './contacts-list.styles';

const ContactsList = ({
  contacts,
  fetchAllContactsStart,
  removeContactsStart,
  filterContacts,
  navigation
}) => {
  const [deleteContacts, setDeleteContacts] = useState([]);

  const handleSearch = useCallback(
    searchQ => {
      filterContacts(searchQ);
    },
    [filterContacts]
  );

  const handleDelete = useCallback(() => {
    removeContactsStart(deleteContacts);
    setDeleteContacts([]);
  }, [removeContactsStart, deleteContacts]);

  const cancelDelete = useCallback(() => {
    setDeleteContacts([]);
  }, []);

  useEffect(() => {
    navigation.setParams({
      handleSearch,
      handleDelete,
      deleteContacts,
      cancelDelete
    });
  }, [handleSearch, handleDelete, deleteContacts, cancelDelete]);

  useEffect(() => {
    fetchAllContactsStart();
    console.log('fetching contacts...');
  }, [fetchAllContactsStart]);

  const handlePress = contact => {
    if (deleteContacts.length && !deleteContacts.includes(contact.id)) {
      setDeleteContacts(current => current.concat(contact.id));
    } else if (deleteContacts.length && deleteContacts.includes(contact.id)) {
      setDeleteContacts(curr => curr.filter(id => id !== contact.id));
    } else {
      navigation.navigate('ShowContact', { contact });
    }
  };

  const handleLongPress = contact => {
    if (!deleteContacts.length) {
      Vibration.vibrate(50, false);
      setDeleteContacts(current => current.concat(contact.id));
    }
  };

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.list}
        keyExtractor={(item, i) => item.id.toString()}
        data={contacts}
        extraData={deleteContacts}
        renderItem={({ item }) => {
          const { id, firstname, lastname, number1, number2, imageuri } = item;
          return (
            <View>
              <List.Item
                title={`${firstname} ${lastname}`}
                description={`${number1}${number2 && '  -  ' + number2}`}
                left={props =>
                  deleteContacts.length && deleteContacts.includes(item.id) ? (
                    <Avatar.Icon icon='check' size={65} />
                  ) : (
                    <Avatar.Image
                      size={65}
                      source={
                        imageuri.length ? { uri: imageuri } : DefaultUserImage
                      }
                    />
                  )
                }
                onPress={handlePress.bind(this, item)}
                onLongPress={handleLongPress.bind(this, item)}
              />
              <Divider />
            </View>
          );
        }}
      />
      {!deleteContacts.length && (
        <FAB
          style={styles.fab}
          icon='add'
          onPress={() => navigation.navigate('AddEditContact')}
        />
      )}
    </View>
  );
};

ContactsList.navigationOptions = navOptions;

const mapStateToProps = createStructuredSelector({
  contacts: selectFilteredContacts
});

const mapDispatchToProps = dispatch => ({
  fetchAllContactsStart: () => dispatch(fetchAllContactsStart()),
  removeContactsStart: ids => dispatch(removeContactsStart(ids)),
  filterContacts: searchQ => dispatch(filterContacts(searchQ))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactsList);
