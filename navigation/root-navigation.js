import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Dimensions } from 'react-native';

import ContactsNavigator from './contacts-navigator';
import AboutNavigator from './about-navigator';

import CustomDrawer from '../components/custom-drawer/custom-drawer.component';
import Colors from '../constants/Colors';

const RootNavigator = createDrawerNavigator(
  {
    Contacts: {
      screen: ContactsNavigator,
      navigationOptions: {
        drawerLabel: 'Contacts'
      }
    },
    About: AboutNavigator
  },
  {
    contentComponent: CustomDrawer,
    drawerWidth: Dimensions.get('window').width * 0.7,
    drawerPosition: 'left',
    contentOptions: {
      activeTintColor: Colors.ACCENT,
      labelStyle: {
        fontFamily: 'open-sans-bold'
      }
    }
  }
);

export default createAppContainer(RootNavigator);
