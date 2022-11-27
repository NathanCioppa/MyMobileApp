import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touch, TouchableOpacity } from 'react-native';

console.log('started')

class App extends Component {
  state = { 
    time: {
      date: new Date().toString(),
      hour: new Date().getHours().toString(),
      min: new Date().getMinutes().toString(),
      sec: new Date().getSeconds().toString()
    }
   } 

  componentDidMount() {
    const time = this.state.time

    setInterval(() => {
    const hour = new Date().getHours()
    const min = new Date().getMinutes()
    const sec = new Date().getSeconds()

      time.date = new Date().toString()
      time.hour = hour > 12 ? (hour-12).toString() : hour === 0 ? (hour+12).toString() : hour.toString()
      time.min = min < 10 ? '0' + min : min.toString()
      time.sec = sec < 10 ? '0' + sec : sec.toString()
      
    this.setState({time})
    }, 1)
  }

  render() { 
    return (
      <SafeAreaView style={styles.container}>
      <Text>text</Text>
      <TouchableOpacity>
      <Text>{this.state.time.date}</Text>
      <Text>{this.state.time.hour + ':' + this.state.time.min + ':' + this.state.time.sec}</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
 
export default App;


