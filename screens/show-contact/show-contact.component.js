import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import {
  Headline,
  Title,
  Caption,
  Subheading,
  Divider,
  FAB
} from 'react-native-paper';
import DefaultUserImage from '../../assets/user.png';

import navOptions from './show-contact.navoptions';
import styles from './show-contact.styles';

const ShowContact = ({ navigation }) => {
  const contact = navigation.getParam('contact');
  const {
    firstname,
    lastname,
    email,
    number1,
    number2,
    address,
    imageuri
  } = contact;

  return (
    <View style={styles.screen}>
      <ScrollView style={styles.screen}>
        <Image
          style={styles.image}
          source={imageuri ? { uri: imageuri } : DefaultUserImage}
        />

        <Caption style={styles.label}>Contact Name</Caption>
        <Headline style={styles.name}>{`${firstname} ${lastname}`}</Headline>
        <Divider />

        <Caption style={styles.label}>First Contact Number</Caption>
        <Title style={styles.number}>{number1}</Title>
        <Divider />

        <Caption style={styles.label}>Second Contact Number</Caption>
        <Title style={styles.number}>{number2}</Title>
        <Divider />

        <Caption style={styles.label}>Email</Caption>
        <Subheading style={styles.email}>{email}</Subheading>
        <Divider />

        <Caption style={styles.label}>Address</Caption>
        <Subheading style={styles.address}>{address}</Subheading>
      </ScrollView>
      <FAB
        style={styles.fab}
        icon='create'
        onPress={() => navigation.navigate('AddEditContact', { contact })}
      />
    </View>
  );
};

ShowContact.navigationOptions = navOptions;

export default ShowContact;
