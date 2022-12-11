import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome'

class Settings extends Component {
    state = {  } 
    render() { 
        return (
        <View style={this.props.containerStyle}>
        <StatusBar style="light" />

            <Text style={styles.title}>Settings</Text>
            <View style={styles.home}>
            <FontAwesome.Button 
            name='home' 
            onPress={this.props.onClose}
            backgroundColor={'transparent'} 
            color="steelblue"
            size={30}
            />
            </View>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    },
    home: {
        position: 'absolute',
        alignSelf: 'flex-start',
        padding: 10,
        paddingTop: 40
    },
})
 
export default Settings;