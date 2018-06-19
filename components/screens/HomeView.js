'use strict';
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'apsl-react-native-button'
import Config from '../config';



class HomeView extends React.Component {

    static navigatorStyle = {
        navBarBackgroundColor: Config.colors.blue
    };

    constructor(props) {

        super(props);

        this.state = {

        };


        this.props.navigator.toggleNavBar({
            to: 'hidden', // required, 'hidden' = hide navigation bar, 'shown' = show navigation bar
            animated: true // does the toggle have transition animation or does it happen immediately (optional). By default animated: true
        });


    }


    ComponentDidMount() {
    }

    render() {
        return (
            <View style={styles.container} >

                <Icon.Button style={styles.incidentButton}
                    name="md-camera"
                    size={30}
                    onPress={this.onPressPhotoButton.bind(this)}
                    backgroundColor="transparent"
                    underlayColor="transparent"
                    color={Config.colors.white}
                    paddingTop={15}
                >Take Photo
            </Icon.Button>

            </View>


        );
    }

    onPressPhotoButton(){
        this.props.navigator.showModal({
            screen: "convoyer.CameraView", // unique ID registered with Navigation.registerScreen
            title: "CONVOYER", // title of the screen as appears in the nav bar (optional)
            passProps: {
              onDone: (data) => {
      
              }
      
            }, // simple serializable object that will pass as props to the modal (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
          });
    }


}

const styles = StyleSheet.create({

    container: {

        flexDirection: "column",
        flex: 1,
        backgroundColor: Config.colors.blue,
        paddingTop: 50

    },
    preview: {
        flex: 1
    },
    capture: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 5,
        color: '#000',
        padding: 10,
        margin: 40
    },
    captureButton: {
        borderTopWidth: 2,
        borderTopColor: Config.colors.black,
        borderBottomWidth: 2,
        borderBottomColor: Config.colors.black,
        marginBottom: 5,
        alignSelf: 'center'


    },
    cancelButton: {
        borderTopWidth: 2,
        borderTopColor: Config.colors.black,
        borderBottomWidth: 2,
        borderBottomColor: Config.colors.black,
        marginBottom: 5


    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }

});



module.exports = HomeView;