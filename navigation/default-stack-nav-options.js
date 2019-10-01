import { Platform } from 'react-native';
import Colors from '../constants/Colors';

export default {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.BG : ''
  },
  headerTitleStyle: {
    fontFamily: 'open-sans-bold'
  },
  headerBackTitleStyle: {
    fontFamily: 'open-sans'
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.BG,
  headerTitle: 'A Screen'
};
