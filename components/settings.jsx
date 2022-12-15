import React, { Component } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
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

            <View style={styles.settingsList}>
                <Text style={styles.catagory}>Greetings:</Text>
                <TextInput style={styles.input} placeholder='Good Morning' placeholderTextColor="rgb(170,170,170)" 
                onChangeText={text => this.props.onEditMor(text)} value={this.props.morGreet === 'Good Morning' ? '' : this.props.morGreet}/>
                <TextInput style={styles.input} placeholder='Good Afternoon' placeholderTextColor="rgb(170,170,170)" 
                onChangeText={text => this.props.onEditAft(text)} value={this.props.aftGreet === 'Good Afternoon' ? '' : this.props.aftGreet}/>
                <TextInput style={styles.input} placeholder='Good Evening' placeholderTextColor="rgb(170,170,170)" 
                onChangeText={text => this.props.onEditEve(text)} value={this.props.eveGreet === 'Good Evening' ? '' : this.props.eveGreet}/>

            </View>

        </View>
        );
    }
}

//<Text>Greeting Font-size:</Text>
//<TextInput style={styles.input} placeholder='30' placeholderTextColor='rgb(170,170,170)' keyboardType='numeric'
//onChangeText={size => this.props.onEditFont(size)} value={this.props.fontSize} />

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: 'white',
        alignSelf: 'center'
    },
    settingsList: {
        marginTop: 20
    },
    catagory: {
        color: 'white',
        fontSize: 20
    },
    input: {
        color: 'white'
    },
    home: {
        position: 'absolute',
        alignSelf: 'flex-start',
        padding: 10,
        paddingTop: 40
    },
})
 
export default Settings;