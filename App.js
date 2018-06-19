'use strict';


import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text
} from 'react-native';


import { Navigation } from 'react-native-navigation';

import Icon from 'react-native-vector-icons/Ionicons';

import Config from './components/config';
import HomeView from './components/screens/HomeView';
import CameraView from './components/screens/CameraView';



var startPage = 'convoyer.HomeView';
console.disableYellowBox = true;


export default class Application extends Component {

}



Navigation.registerComponent('convoyer.HomeView', () => HomeView);
Navigation.registerComponent('convoyer.CameraView', () => CameraView);


Navigation.startSingleScreenApp({
  screen: {
    screen: startPage,
    title: 'TEST',
    navigatorStyle: {
      navBarTextColor: Config.colors.white
    }
  }
});





