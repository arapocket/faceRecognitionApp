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

import IDService from '../lib/IDService';
import PatrolService from '../lib/PatrolService';


class HomeView extends React.Component {

    static navigatorStyle = {
        navBarBackgroundColor: Config.colors.blue
    };

    constructor(props) {

        super(props);

        this.idService = IDService.getInstance();
        this.patrolService = PatrolService.getInstance();

        this.state = {
            description: ''
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

    onPressPhotoButton() {
        this.props.navigator.showModal({
            screen: "convoyer.CameraView", // unique ID registered with Navigation.registerScreen
            title: "CONVOYER", // title of the screen as appears in the nav bar (optional)
            passProps: {
                onDone: (data) => {

                    let mediaType = this.patrolService.getMediaType();

                    this.idService.createIncidentID();
                    this.uploadMedia();

                }

            }, // simple serializable object that will pass as props to the modal (optional)
            animationType: 'slide-up' // 'none' / 'slide-up' , appear animation for the modal (optional, default 'slide-up')
        });
    }


    uploadMedia() {

        var filePath = this.patrolService.getMediaPath();
        const image = {
            uri: filePath,
            type: 'image/jpeg',
            name: 'photo.jpg',
          };
          
          const form = new FormData();
          form.append("image", image);
          
          fetch(
            "http://ec2-34-215-115-69.us-west-2.compute.amazonaws.com:3000/imageRecognition/searchForImageMatch",
            {
              body: form,
              method: "PUT",
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          ).then((response) => response.json())
          .catch((error) => {
            alert("ERROR " + error)
          })
          .then((responseData) => {
            alert("Succes "+ JSON.stringify(responseData))
          }).done();
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