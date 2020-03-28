import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

//Import files/componenets
import SocialMedia from '../components/SocialMedia';

export default function HomeScreen() {
  return (
      <ScrollView>
          <View style={{paddingTop: 20, alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', fontSize: 40, color: 'blue'}}>Welcome to Heuco!!</Text>

            <Text style={styles.textHeader}>New Routes Near You</Text>
            <View style={styles.headerRow}/>
            <Text> Setter   |    Type      |            Name            | Grade </Text>
            <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
            <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
            <Text>  John  | Boulder   | Taco's First Route |   v0</Text>
            <Text>  Matt  | Top Rope  | Matt's First Route |   5.9</Text>

            <Text style={styles.textHeader}>Your Send Group Updates</Text>
            <View style={styles.headerRow}/>
            <Text>John Says: Hello!!</Text>
            <Text>Matt Says: Just did first v0!!! I am soooo good! (:</Text>
            <Text>John Climbed: v10</Text>
            <Text>Matt Climbed: 5.7</Text>
          </View>

          <View>
            <SocialMedia />
            <Text>{"\n"}{"\n"}</Text>{/* Breaks needed so social media does not get covered by nav bar */}
          </View>
      </ScrollView>


  );
}

HomeScreen.navigationOptions = {
  header: null,
};





const styles = StyleSheet.create({
  textHeader: {
    paddingTop: 20, 
    fontWeight: 'bold', 
    fontSize: 20
  },
  headerRow:{
    borderWidth: 2,
    width: '90%',
    borderColor:'black',
    margin:10,
}
});
