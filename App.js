import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touch, TouchableOpacity, Platform } from 'react-native';
import Clock from './components/clock';
import Todo from './components/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './components/settings';

class App extends Component {
  state = { 
    time: {
      date: new Date().toString(),
      month: '',
      day: '',
      weekday: '',
      hour: new Date().getHours().toString(),
      amPm: '--',
      military: false,
      min: new Date().getMinutes().toString(),
      sec: new Date().getSeconds().toString(),
      greeting: ''
    },
    
    todo: [],
  }
  
  componentDidMount() {
    const time = this.state.time
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    function getTime() {
      const hour = new Date().getHours()
      const min = new Date().getMinutes()
      const sec = new Date().getSeconds()

      time.date = new Date().toString()
      time.hour = time.military ? hour : hour > 12 ? (hour-12).toString() : hour === 0 ? (hour+12).toString() : hour.toString()
      time.min = min < 10 ? '0' + min : min.toString()
      time.sec = sec < 10 ? '0' + sec : sec.toString()
      time.amPm = time.military ? '--' : hour < 12 ? 'AM' : 'PM'

      time.weekday = week[new Date().getDay()]
      time.month = month[new Date().getMonth()]
      time.day = new Date().getDate()

      time.greeting = hour < 6 ? 'Good Evening' : hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening'
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

  newId = new Date().toString()
  generateId() {
    const id = this.newId
    id = id === new Date.toString() ? id + new Date().getMilliseconds().toString() + Math.floor(Math.random() * 1000).toString() : new Date.toString()
    id = Math.floor(Math.random() * 1000)
    console.log(id)
    console.log(newId)
    console.log(new Date().toString())
  }

  constructor() {
    super()
    this.getData()
  }

  handleSubmit = async (value) => {
  try {

    if (value !== '') {
      const todo = this.state.todo

      this.state.todo.push({
      id: this.newId,
      value: value
      })

      this.newId = this.newId === new Date().toString() ? new Date().getMilliseconds().toString() + Math.random().toString() : new Date().toString()
      this.setState({todo})

      await AsyncStorage.setItem('usertodo', JSON.stringify({todo}))
      
    } 

  } catch(e) {
    console.log(e);
  }
  }

  getData = async () => {
    try {
      const usertodo = await AsyncStorage.getItem('usertodo')
      const UserTodo = JSON.parse(usertodo)
      if(UserTodo !== null) {
        this.setState({...UserTodo})
      }
    } catch(e) {
      console.log(e)
    }
  }

  handleDelete = async id => {
  try {
    const todo = this.state.todo.filter(task => task.id !== id)
    this.setState({todo})
    await AsyncStorage.setItem('usertodo', JSON.stringify({todo}))
  } catch(e) {
    console.log(e)
  }  
  }

  viewSettings = false

  toggleSettings = () => {
    this.viewSettings = this.viewSettings ? false : true
  }

  render() {
  if (this.viewSettings) {
    return ( 
      <Settings 
      containerStyle={[styles.container, {alignItems: 'flex-start'}]}
      onClose={this.toggleSettings}
      />
    )
  } else

    return (
    <View style={styles.container}>

      <StatusBar style="light" />

      <Text style={[styles.greeting, styles.fonts.ssm]}>{this.state.time.greeting}</Text>

       <Clock 
       onPress={this.handleClockPress}
       militaryMessage={this.militaryMessage}
       hour={this.state.time.hour}
       min={this.state.time.min}
       sec={this.state.time.sec}
       amPm={this.state.time.amPm}
       weekday={this.state.time.weekday}
       month={this.state.time.month}
       day={this.state.time.day}
       />

       <Button onPress={this.toggleSettings} title='settings'></Button>

       <Todo
       onSubmit={this.handleSubmit}
       onDelete={this.handleDelete}
       todo={this.state.todo}
       />

    </View>
    );
  }
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: 'rgb(40, 40, 48)',
    padding: 10,
    paddingTop: 40,
    alignItems: 'center'
  },

  greeting: {
    fontSize: 30,
    color: 'white'
  },
  
  fonts: {
    mono: {fontFamily: 'monospace'},
    ssl: {fontFamily: 'sans-serif-light'},
    ssc: {fontFamily: 'sans-serif-condensed'},
    ssm: {fontFamily: 'sans-serif-medium'},
    serif: {fontFamily: 'serif'},

    colors: {
      pale: {color: "rgb(170,170,170)"}
    }
  }
});

// for testing
  // <Button onPress={this.clearAll} title='Dead!'></Button>
  //clearAll = async () => {
  //  try {
  //    await AsyncStorage.clear()
  //  } catch(e) {
  //    console.log(e)
  //  }
  //  console.log('Done.')
  //}
 
export default App;