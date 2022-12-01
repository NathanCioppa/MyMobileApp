import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touch, TouchableOpacity, Platform } from 'react-native';


class TodoTask extends Component {
    state = {  } 
    render() { 
        return (
            <View style={styles.container}>
                <Text style={[styles.text]}>{this.props.value}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5,
        borderStartWidth: 3,
        borderRadius: 2,
        borderColor: 'steelblue'
    },
    text: {
        padding: 3,
        color: 'white',
        fontSize: 20,
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
 
export default TodoTask;