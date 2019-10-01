import React from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';

import AhmedAfifi from '../../assets/ahmed_afifi.jpg';

import navOptions from './about.navoptions';
import styles from './about.styles';

const About = () => {
  return (
    <ScrollView style={styles.screen}>
      <View style={styles.cardContainer}>
        <Card style={styles.card}>
          <Card.Cover source={AhmedAfifi} style={styles.cover} />
          <Card.Content>
            <Title>Ahmed Afifi</Title>
            <Paragraph>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
              doloribus error ab, tempora temporibus modi maxime praesentium hic
              assumenda, beatae soluta voluptas sequi saepe, unde nesciunt
              quaerat voluptate expedita omnis sint iste. Dignissimos ipsa
              corrupti accusamus? Perferendis dicta doloremque, omnis ipsa
              magnam blanditiis temporibus enim at reiciendis libero sint
              dolore.
            </Paragraph>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
};

About.navigationOptions = navOptions;

export default About;
