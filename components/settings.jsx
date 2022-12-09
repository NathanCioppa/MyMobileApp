import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet } from 'react-native';

class Settings extends Component {
    state = {  } 
    render() { 
        return (
        <View style={this.props.containerStyle}>
        <StatusBar style="light" />

            <Text style={styles.title}>Settings</Text>
            <Button title='settings' onPress={this.props.onClose}></Button>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        color: 'white',
        alignSelf: 'center'
    }
})
 
export default Settings;