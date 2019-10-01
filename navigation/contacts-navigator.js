import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from 'react-navigation-stack';

import defaultNavigationOptions from './default-stack-nav-options';

import ContactsListScreen from '../screens/contacts-list/contacts-list.component';
import ShowContactScreen from '../screens/show-contact/show-contact.component';
import AddEditContactScreen from '../screens/add-edit-contact/add-edit-contact.component';

export default createStackNavigator(
  {
    ContactsList: {
      screen: ContactsListScreen
    },
    ShowContact: {
      screen: ShowContactScreen
    },
    AddEditContact: AddEditContactScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => (
        <Ionicons
          name={Platform.OS === 'android' ? 'md-home' : 'ios-home'}
          size={23}
          color={drawerConfig.tintColor}
        />
      )
    },
    defaultNavigationOptions
  }
);
