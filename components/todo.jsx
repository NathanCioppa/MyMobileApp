import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touch, TouchableOpacity, Platform, TextInput } from 'react-native';

class Todo extends Component {

    constructor() {
        super()
        this.state={inputValue: ''}
    }

 handleSubmit = () => {
    const value = this.state.inputValue
    console.log(value)
 }
    render() { 
        return (
            <TextInput onChangeText={inputValue => this.setState({inputValue})} onSubmitEditing={this.handleSubmit} placeholder='What are you doing today?'/>
        );
    }
}
 
export default Todo;