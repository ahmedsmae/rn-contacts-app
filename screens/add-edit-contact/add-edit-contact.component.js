import React, { useState } from 'react';
import { connect } from 'react-redux';
import { View, KeyboardAvoidingView, ScrollView, Alert } from 'react-native';
import { FAB } from 'react-native-paper';
import { createStructuredSelector } from 'reselect';

import {
  selectIsLoading,
  selectErrorMessage
} from '../../redux/contacts/contacts.selectors';
import {
  addContactStart,
  editContactStart
} from '../../redux/contacts/contacts.actions';

import ImagePicker from '../../components/image-picker/image-picker.component';
import FormInput from '../../components/form-input/form-input.component';

import navOptions from './add-edit-contact.navoptions';
import styles from './add-edit-contact.styles';

const AddEditContact = ({
  addContactStart,
  editContactStart,
  isLoading,
  errorMessage,
  navigation
}) => {
  const contact = navigation.getParam('contact');

  const [userDetails, setUserDetails] = useState({
    id: contact ? contact.id : '',
    firstname: contact ? contact.firstname : '',
    lastname: contact ? contact.lastname : '',
    address: contact ? contact.address : '',
    number1: contact ? contact.number1 : '',
    number2: contact ? contact.number2 : '',
    email: contact ? contact.email : '',
    imageuri: contact ? contact.imageuri : ''
  });
  const {
    firstname,
    lastname,
    address,
    email,
    number2,
    number1,
    imageuri
  } = userDetails;

  const handleChange = ({ name, value }) => {
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = () => {
    if (!firstname || !number1) {
      return Alert.alert(
        'Missing data',
        "You should include at least your contact's Firstname and First contact number",
        [{ text: 'OK' }]
      );
    }

    if (contact) {
      editContactStart(userDetails);
      if (!isLoading && !errorMessage.length) {
        navigation.navigate('ShowContact', { contact: userDetails });
      }
    } else {
      addContactStart(userDetails);
      if (!isLoading && !errorMessage.length) {
        navigation.goBack();
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior='padding'
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.screen}>
        <ImagePicker
          style={{ marginBottom: 10 }}
          defaultImage={imageuri}
          onImageTaken={imageuri =>
            setUserDetails(prevDetails => ({ ...prevDetails, imageuri }))
          }
        />

        <View style={styles.rowContainer}>
          <FormInput
            outlined
            capWords
            style={{ width: '45%' }}
            label='Firstname'
            placeholder='enter firstname'
            required='required'
            name='firstname'
            value={firstname}
            onChange={handleChange}
          />

          <FormInput
            outlined
            capWords
            style={{ width: '45%' }}
            label='Lastname'
            placeholder='enter lastname'
            name='lastname'
            value={lastname}
            onChange={handleChange}
          />
        </View>

        <FormInput
          outlined
          keyboardType='phone-pad'
          label='First Contact number'
          placeholder='enter contact number'
          required='required'
          name='number1'
          value={number1}
          onChange={nameVal => handleChange(nameVal)}
        />

        <FormInput
          outlined
          keyboardType='phone-pad'
          label='Second contact number'
          placeholder='enter contact number'
          name='number2'
          value={number2}
          onChange={nameVal => handleChange(nameVal)}
        />

        <FormInput
          outlined
          keyboardType='email-address'
          label='Email'
          placeholder='enter email'
          name='email'
          value={email}
          onChange={nameVal => handleChange(nameVal)}
        />

        <FormInput
          outlined
          capSentence
          multiline
          done
          label='Address'
          placeholder='enter address'
          name='address'
          value={address}
          onChange={nameVal => handleChange(nameVal)}
        />
      </ScrollView>

      <FAB style={styles.fab} icon='save' onPress={handleSubmit} />
    </KeyboardAvoidingView>
  );
};

AddEditContact.navigationOptions = navOptions;

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
  errorMessage: selectErrorMessage
});

const mapDispatchToProps = dispatch => ({
  addContactStart: contact => dispatch(addContactStart(contact)),
  editContactStart: contact => dispatch(editContactStart(contact))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddEditContact);
