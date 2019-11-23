import React from 'react';
import {Dimensions} from 'react-native';
import { createDrawerNavigator,DrawerNavigatorItems  } from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import HomeScreen from '../../screens/home/homeScreen';
import CategoryScreen from '../../screens/category/categoryScreen';
import MenuDrawer from '../component/menuDrawer';
import ConverterScreen from '../../screens/converter/converterScreen';
import { createStackNavigator } from 'react-navigation-stack';
import CreateScreen from '../../screens/create/createScreen';
import DetailedViewScreen from '../../screens/home/detailedViewScreen';
import AddEventScreen from '../../screens/event/addEventScreen';
import NotificationScreen from "../../screens/notifications/notificationScreen";
import LocationScreen from "../../screens/location/locationScreen";

const WIDTH = Dimensions.get('window').width;

const DrawerConfig = {
    drawerWidth: "70%",
    contentComponent: ({navigation})=>{
        return (<MenuDrawer navigation={navigation}/>)
    },
    contentOptions: {
        activeTintColor: '#ff1e20',
        itemsContainerStyle: {
            marginVertical: 0,
        },
        iconContainerStyle: {
            opacity: 1
        }
    }
}

const HomeStack = createStackNavigator({
    Home: HomeScreen,
    Create: CreateScreen,
    DetailedView: DetailedViewScreen
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})

const CategoryStack = createStackNavigator({
    CategoryMain: CategoryScreen,
}, {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
})


const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: HomeStack,
    },
    Category: {
        screen: CategoryStack,
    },
    Event: {
        screen:AddEventScreen,
    },
    Converter: {
        screen: ConverterScreen
    },
    Notification:{
        screen:NotificationScreen
    },
    Location: {
        screen:LocationScreen
    }
}, DrawerConfig);


export default createAppContainer(DrawerNavigator);
