import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default class TypeComponent extends React.Component {
    render() {
        return (
            <View style={{
                flexDirection:'row',
                flex:1,
                justifyContent:'center',
                alignItems:'center'
            }}>
            <TouchableOpacity
                disabled={this.props.disabled}
                onPress={this.props.onPress}
                style={{
                flex:1,
                alignItems:'center',
                alignContent:'center',
                    paddingVertical:20
            }}>
                <Text>{this.props.label}</Text>
                <Text style={{
                    fontSize:16
                }}>{this.props.value}</Text>
            </TouchableOpacity>
                {this.props.showDivider?
                <View style={{
                    marginVertical:20,
                    justifyContent:'center',
                    alignItems:'center',
                    height:20,
                    borderRightColor:'#000',
                    borderRightWidth:1
                }}/>:null}
            </View>
        );
    }
}


