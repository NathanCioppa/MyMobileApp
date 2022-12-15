import React, { Component, useReducer } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touch, TouchableOpacity, Platform, Dimensions } from 'react-native';
import Clock from './components/clock';
import Todo from './components/todo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './components/settings';
import FontAwesome from '@expo/vector-icons/FontAwesome'
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

    greetings: {
      mor: '',
      aft: '',
      eve: '',
    },

    greetingSize: 30,
    
    todo: [],
  }

  constructor() {
    super()
    this.getData()
  }

  getTime = () => {
    const time = this.state.time
    const greetings = this.state.greetings
    const week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const hour =  new Date().getHours()

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

      time.greeting = hour < 6 ? greetings.eve : hour < 12 ? greetings.mor : hour < 18 ? greetings.aft : greetings.eve
  }

  componentDidMount() {
    const time = this.state.time
    this.setState(this.state.greetings)
    this.setState({time})
    //this.setState(this.state)
    this.getTime()
    
    
    setInterval(() => {
      this.getTime()
      this.setState({time})
    }, 100)
    
  }

  militaryMessage = ''

  handleClockPress = () => {
    this.state.time.military = this.state.time.military ? false : true 
    this.militaryMessage = this.state.time.military ? 'Showing military time, tap to change' : ''
  }

  newId = new Date().toString()

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

  handleEditMor = async text => {
    try {
      const greetings = this.state.greetings
      greetings.mor = text === '' ? 'Good Morning' : text
      this.setState({greetings})
      await AsyncStorage.setItem('userGreets', JSON.stringify({greetings}))
    } catch (e) {
      console.log(e)
    }
  }
  handleEditAft = async text => {
    try {
      const greetings = this.state.greetings
      greetings.aft = text === '' ? 'Good Afternoon' : text
      this.setState({greetings})
      await AsyncStorage.setItem('userGreets', JSON.stringify({greetings}))
    } catch (e) {
      console.log(e)
    }  
  }
  handleEditEve = async text => {
    try {
      const greetings = this.state.greetings
      greetings.eve = text === '' ? 'Good Evening' : text
      this.setState({greetings})
      await AsyncStorage.setItem('userGreets', JSON.stringify({greetings}))
    } catch (e) {
      console.log(e)
    }
  }

  handleFont = async size => {
    console.log(size)
    try {
      let greetingSize = this.state.greetingSize
      greetingSize = size === '' ? 30 : size
      this.setState({greetingSize})
      console.log(greetingSize)
      await AsyncStorage.setItem('userFont', JSON.stringify({greetingSize}))
    } catch (e) {
      console.log(e)
    }
      
  }

  getData = async () => {
    try {
      const usertodo = await AsyncStorage.getItem('usertodo')
      const UserTodo = JSON.parse(usertodo)
      if(UserTodo !== null) {
        this.setState({...UserTodo})
      }

      const usergreets = await AsyncStorage.getItem('userGreets')
      const UserGreets = JSON.parse(usergreets)
      if (UserGreets !== null) {
        this.setState({...UserGreets})
      }
      this.state.greetings.eve = this.state.greetings.eve === '' ? 'Good Evening' : this.state.greetings.eve
      this.state.greetings.aft = this.state.greetings.aft === '' ? 'Good Afternoon' : this.state.greetings.aft
      this.state.greetings.mor = this.state.greetings.mor === '' ? 'Good Morning' : this.state.greetings.mor

      const userfont = await AsyncStorage.getItem('userFont')
      const UserFont = JSON.parse(userfont)
      if (UserFont !== null) {
        this.setState({...UserFont})
        console.log(this.state.greetingSize)
        console.log(UserFont)
      }

    } catch(e) {
      console.log(e)
    }
  }

  render() { 
    return(<View style={{flex: 1, backgroundColor: 'rgb(40, 40, 48)'}}>{
      !this.viewSettings ? 
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

       <Todo
       onSubmit={this.handleSubmit}
       onDelete={this.handleDelete}
       todo={this.state.todo}
       />

      <View style={styles.settings}>
      <FontAwesome.Button 
      name='gear' 
      onPress={this.toggleSettings} 
      backgroundColor={'transparent'} 
      color="steelblue"
      size={30}
      />
      </View>

    </View> 
    :
    <Settings 
    containerStyle={[styles.container, {alignItems: 'flex-start'}]}
    onClose={this.toggleSettings}
    onEditMor={this.handleEditMor}
    morGreet={this.state.greetings.mor}
    onEditAft={this.handleEditAft}
    aftGreet={this.state.greetings.aft}
    onEditEve={this.handleEditEve}
    eveGreet={this.state.greetings.eve}
    onEditFont={this.handleFont}
    fontSize={this.state.greetingSize}
    />
    }</View>)
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

  settings: {
    position: 'absolute',
    alignSelf: 'flex-start',
    padding: 10,
    paddingTop: 40
  },

  greeting: {
    fontSize: 30,
    color: 'white',
    width: 250,
    textAlign: 'center'
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
//} catch(e) {
//    console.log(e)
//}
//  console.log('Done.')
//}

  
  
 
export default App;