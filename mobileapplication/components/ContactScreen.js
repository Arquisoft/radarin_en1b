import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class ContactScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Contact Screen</Text>
        <Button
          title="Return to the Home Screen"
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    )
  }
}