import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, SafeAreaView, Image, Touch, TouchableOpacity, Platform, Dimensions } from 'react-native';


class TodoTask extends Component {
    state = {  } 
    render() { 
        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.fonts.ssc]}>{this.props.value}</Text>

                <TouchableOpacity style={styles.delete}
                    onPress={() => this.props.onDelete(this.props.id)}
                >
                    <Text style={styles.fonts.colors.pale}>X</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
        marginBottom: 5,
        marginEnd: 5,
        borderStartWidth: 3,
        borderRadius: 2,
        borderColor: 'steelblue',
        backgroundColor: 'rgba(255, 255, 255, 0.04)',
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        width: Dimensions.get('window').width - 20
        
    },
    text: {
        padding: 5,
        color: 'white',
        fontSize: 20,
        width: Dimensions.get('window').width - 50
        
    },
    delete: {
        padding: 10,
        right: 4
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