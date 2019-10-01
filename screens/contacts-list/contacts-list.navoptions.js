import React from 'react';
import { Platform, TextInput } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/custom-header-button/custom-header-button.component';
import Colors from '../../constants/Colors';

export default ({ navigation }) => {
  const searchMode = navigation.getParam('searchMode');
  const handleSearch = navigation.getParam('handleSearch');
  const handleDelete = navigation.getParam('handleDelete');
  const deleteContacts = navigation.getParam('deleteContacts');
  const cancelDelete = navigation.getParam('cancelDelete');

  return {
    headerTitle:
      deleteContacts && deleteContacts.length ? (
        'Delete Contacts'
      ) : searchMode ? (
        <TextInput
          placeholder='Search...'
          mode='flat'
          autoFocus
          autoCapitalize='none'
          onChangeText={handleSearch}
          style={{
            flex: 1,
            fontSize: 18,
            marginVertical: 5,
            color: Platform.OS === 'android' ? 'white' : Colors.BG,
            backgroundColor: 'transparent'
          }}
        />
      ) : (
        'My Contacts'
      ),
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Menu'
          iconName='ios-menu'
          onPress={() => {
            navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight:
      deleteContacts && deleteContacts.length ? (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title='Cancel' onPress={cancelDelete} />
          <Item
            title='Delete'
            iconName={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
            onPress={handleDelete}
          />
        </HeaderButtons>
      ) : searchMode ? (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Close'
            iconName={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
            onPress={() => {
              navigation.setParams({ searchMode: false });
              handleSearch('');
            }}
          />
        </HeaderButtons>
      ) : (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title='Search'
            iconName={Platform.OS === 'android' ? 'md-search' : 'ios-search'}
            onPress={() => navigation.setParams({ searchMode: true })}
          />
        </HeaderButtons>
      )
  };
};
