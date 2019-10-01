import React from 'react';
import { View, ScrollView, SafeAreaView, Image } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import Toast from 'react-native-root-toast';

import DefaultUserImage from '../../assets/user.png';

import styles from './custom-drawer.styles';

const CustomDrawer = props => {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Image style={styles.image} source={DefaultUserImage} />
      </View>
      <ScrollView>
        <DrawerNavigatorItems {...props} />
      </ScrollView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Contacts App</Text>
        <Button
          mode='outlined'
          color='orange'
          style={styles.footerButton}
          onPress={() => Toast.show('Welcome to Contacts App')}
        >
          US
        </Button>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;
