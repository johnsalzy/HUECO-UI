import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Divider } from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

import { app_styles } from '../assets/styles/universal';
import SocialMedia from '../components/SocialMedia'

export default function HomeScreen() {
  return (
    <View style={app_styles.screen}>
      <ScrollView>
        <Text style={styles.welcomeText}>Welcome to Heuco!!</Text>

        <View style={{paddingTop: 10}}>
          <Text style={styles.bigText}>Our Goal</Text>
          <Divider style={styles.divider} />
          <Text style={styles.goalText}>
            {"\t"}Web services e-markets, transition reinvent engage strategize redefine. 
            Social group buying crowded market freemium prototype Early stage disruptive ecosystem community outreach dynamic location based strategic investor. 
            Big data infographic. Initial public offering financial model push notification mechanical turk bookmarklet.
            {"\n"}{"\n"}
            {"\t"}Coworking viral landing page user base minimum viable product hackathon API mashup FB Connect. 
            Evolve metrics innovative iterate: peer-to-peer communities communities robust, proactive, 
            web-readiness markets infomediaries platforms 24/365 innovate synergize deliverables cross-platform.
          </Text>
        </View>

        <Text style={styles.bigText}>Advangtages of Heuco - Users</Text>
        <Divider style={styles.divider} />
        <Text>{'\u2022'} Aggressive workouts to help you train</Text>
        <Text>{'\u2022'} Compatible for indoor & outdoor routes</Text>
        <Text>{'\u2022'} Route & grade tracking to help visualize progress</Text>
        <Text>{'\u2022'} Watch & cheer on friends as they complete routes</Text>

        <Text style={styles.bigText}>Advangtages of Heuco - Gyms</Text>
        <Divider style={styles.divider} />
        <Text>{'\u2022'} See what routes are/arent being climbed</Text>
        <Text>{'\u2022'} Display to users new routes that your gym has</Text>

        <SocialMedia />
      </ScrollView>
    </View>

  );
}

const styles = StyleSheet.create({
    divider: { marginTop: 5, backgroundColor: '#052F5F', height: 2 },
    welcomeText: {fontSize: 25, fontWeight: 'bold', textAlign: 'center', color: '#052F5F'},
    bigText: {paddingTop: 10, fontSize: 19, fontWeight: 'bold', textAlign: 'center', color: '#052F5F'},
    goalText: {textAlign: 'center'},
});
