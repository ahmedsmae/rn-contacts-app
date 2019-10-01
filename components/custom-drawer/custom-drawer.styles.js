import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  screen: {
    flex: 1,
    marginTop: 20
  },
  header: {
    height: 150,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: 'black',
    borderWidth: 1
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  footerText: {
    fontSize: 18,
    marginVertical: 10
  },
  footerButton: {
    marginVertical: 10
  }
});
