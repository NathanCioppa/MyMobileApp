import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touch, TouchableOpacity, Platform } from 'react-native';

//console.log('started')

class App extends Component {
  state = { 
    time: {
      date: new Date().toString(),
      hour: new Date().getHours().toString(),
      amPm: '',
      military: false,
      min: new Date().getMinutes().toString(),
      sec: new Date().getSeconds().toString()
    }
   } 

  
  componentDidMount() {
    const time = this.state.time

    function getTime() {
      const hour = new Date().getHours()
      const min = new Date().getMinutes()
      const sec = new Date().getSeconds()

      time.date = new Date().toString()
      time.hour = time.military ? hour : hour > 12 ? (hour-12).toString() : hour === 0 ? (hour+12).toString() : hour.toString()
      time.min = min < 10 ? '0' + min : min.toString()
      time.sec = sec < 10 ? '0' + sec : sec.toString()
      time.amPm = time.military ? '--' : hour < 12 ? 'AM' : 'PM'
    }
    getTime()
    this.setState({time})

    setInterval(() => {
      getTime()  
      this.setState({time})
    }, 100)
  }

  militaryMessage = ''

  handleClockPress = () => {
    this.state.time.military = this.state.time.military ? false : true 
    this.militaryMessage = this.state.time.military ? 'Showing military time, tap to change' : ''
  }

  render() { 
    return (
      <View style={styles.container}>

        <TouchableOpacity onPress={this.handleClockPress}>

        <Text style={{top: 25, alignSelf: 'center', paddingLeft: 10, paddingRight: 10}}>{this.militaryMessage}</Text>

          <View style={styles.clock.container}>

            <Text style={[styles.clock, styles.fonts.ssl]}>
              {this.state.time.hour + ':' + this.state.time.min} 
            </Text>

            <View style={styles.clock.last}>

              <View style={styles.clock.last.text.TOP}>
                <Text style={[styles.clock.last.text, styles.fonts.ssl, styles.fonts.colors.pale]}>
                  {this.state.time.sec}
                </Text>
              </View>

              <View style={styles.clock.last.text.BOTTOM}>
                <Text style={[styles.clock.last.text]}>
                  {this.state.time.amPm}
                </Text>
              </View>

            </View>

          </View>
       </TouchableOpacity>

       <StatusBar style="auto" />

    </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    alignItems: 'center',
  },

  clock: {
    fontSize: 74,
    paddingRight: 10,

    container: {
      backgroundColor: '',
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      borderWidth: 2,
      borderRadius: 15,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    last: {
      alignItems: 'center',
      text: {
        fontSize: 37,
        TOP: {
          top: 11,
        },
        BOTTOM: {
          top: -10
        }
      }
    }
  },
  fonts: {
    mono: {fontFamily: 'monospace'},
    ssl: {fontFamily: 'sans-serif-light'},

    colors: {
      red: {color: 'red'},
      pale: {color: "rgb(150,150,150)"}
    }
  }
});
 
export default App;