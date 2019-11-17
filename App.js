import React from 'react';
import {Text, View} from 'react-native';
import DrawerNavigator from './lib/navigation/drawerNavigator'

export default class App extends React.Component {
    render() {
        return (
            <View style={{flex:1}}>
                <DrawerNavigator/>
            </View>
        );
    }
}


