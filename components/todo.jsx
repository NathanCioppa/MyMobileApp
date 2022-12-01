import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touch, TouchableOpacity, Platform, TextInput } from 'react-native';
import TodoTask from './todoTask';

class Todo extends Component {

    constructor() {
        super()
        this.state={
            inputValue: '',
            underline: "rgb(170,170,170)"
        }
    }

    handleFocus() {
        this.setState({underline: 'white'})
    }
    handleBlur() {
        this.setState({underline: "rgb(170,170,170)"})
    }

    render() { 
        return (
        <View style={styles.container}>

            <TextInput style={[styles.input, styles.fonts.ssc, {borderBottomColor: this.state.underline}]}
            ref={this.props.todoRef}
            onChangeText={inputValue => this.setState({inputValue})} 
            onSubmitEditing={() => {this.props.onSubmit(this.state.inputValue), this.setState({inputValue: ''}) }}
            value={this.state.inputValue}

            placeholder='What are you doing today?'
            placeholderTextColor="rgb(170,170,170)"
            onFocus={() => this.handleFocus()}
            onBlur={() => this.handleBlur()}
            />

            <View style={{marginTop: 20}}>
                {this.props.todo.map(todo => (
                <TodoTask
                key={todo.id}
                id={todo.id}
                value={todo.value}
                />
                ))}
                
                
            </View>
        
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
//        backgroundColor: 'white',
        flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 50,
        width: '100%'

    },

    input: {
        fontSize: 20,
        color: 'white',
        borderBottomWidth: 2,
        width: '100%',
        padding: 5
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
})
 
export default Todo;