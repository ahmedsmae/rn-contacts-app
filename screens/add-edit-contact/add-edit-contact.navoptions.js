export default ({ navigation }) => {
  const contact = navigation.getParam('contact');

  return {
    headerTitle: contact ? 'Edit Contact' : 'Add Contact'
  };
};
