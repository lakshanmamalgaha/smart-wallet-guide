import React from 'react';
import {View,Text,Dimensions,TouchableOpacity} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationActions } from 'react-navigation';
const WIDTH= Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class MenuDrawer extends React.Component{
    navigate = (route) => {
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }
    renderNavLink(nav,text,iconName,iconColor){
        return(
            <TouchableOpacity onPress={() => {
                    this.navigate(nav);
                this.props.navigation.closeDrawer();
                }}
                              style={{
                                  paddingVertical:10,
                                  paddingHorizontal:10,
                              }}
            >
                <View style={{
                    flexDirection:'row'
                }}>
                    <Ionicons name={iconName} color={iconColor} size={25}/>
                <Text style={{
                    fontSize:20,
                    paddingLeft:30,
                }}>{text}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    render(){
        return(
            <View style={{
                flex:1,
                height:HEIGHT,
                backgroundColor:"#ffffff"
            }}>
                <View style={{
                    flex:3,
                    backgroundColor:'#feff47'
                }}>

                </View>
                <View style={{
                    flex:9
                }}>
                    {this.renderNavLink('Home','Home','ios-home','red')}
                    {this.renderNavLink('Category','Categories','ios-list-box','green')}
                    {this.renderNavLink('Converter','Converter','ios-git-compare','green')}

                </View>
            </View>
        )
    }
}
