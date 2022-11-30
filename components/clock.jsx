import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Platform } from 'react-native';

class Clock extends Component {
    render() { 
        return (
        <View>
            <TouchableOpacity onPress={this.props.onPress}>

                <Text style={[styles.clock.military, styles.fonts.colors.pale]}>
                    {this.props.militaryMessage}
                </Text>

                <View style={styles.clock.container}>

                    <Text style={[styles.clock, styles.fonts.ssl]}>
                      {this.props.hour + ':' + this.props.min} 
                    </Text>

                    <View style={styles.clock.last}>

                        <View style={styles.clock.last.text.TOP}>
                         <Text style={[styles.clock.last.text, styles.fonts.ssl, styles.fonts.colors.pale]}>
                             {this.props.sec}
                         </Text>
                         </View>

                        <View style={styles.clock.last.text.BOTTOM}>
                            <Text style={[styles.clock.last.text]}>
                            {this.props.amPm}
                            </Text>
                        </View>

                    </View>

                </View>

            </TouchableOpacity>
            
            <Text style={[styles.fonts.ssc, styles.clock.day]}>
                {this.props.weekday + ', ' + this.props.month + ' ' + this.props.day}
            
            </Text>

        </View>
        );
    }
}

const styles = StyleSheet.create({
    clock: {
        fontSize: 74,
        color: 'white',
        paddingRight: 10,
    
        container: {
          backgroundColor: '',
          padding: 10,
          paddingLeft: 20,
          paddingRight: 20,
          borderWidth: 2,
          borderRadius: 15,
          borderColor: "rgb(170,170,170)",
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center'
        },
        military: {
          top: 25, 
          alignSelf: 'center', 
          paddingLeft: 10, 
          paddingRight: 10
        },
        last: {
          alignItems: 'center',
          text: {
            fontSize: 37,
            color: 'white',
            TOP: {
              top: 11,
            },
            BOTTOM: {
              top: -10
            }
          }
        },
        day: {
          alignSelf: 'center',
          fontSize: 20,
          color: 'white'
        }
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
 
export default Clock;