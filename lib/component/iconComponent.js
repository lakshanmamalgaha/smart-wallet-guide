import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class IconComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isActive: props.isActive,
        };
    }

    toggle=()=>{
        if (this.state.isActive === false) {
            this.setState({isActive: true});
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({isActive: nextProps.isActive})
    };
    render() {
        return (
            <View style={{
                width:this.props.width/5,
                height:'33%',
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                marginVertical:10,
                marginHorizontal:5

            }}>
                <TouchableOpacity
                    onPress={this.props.onPress}
                    style={{
                    flex:1,
                }}>
                    <MaterialCommunityIcons name={this.props.iconName} size={30}
                                            color={this.state.isActive?'#d00':'#000'}/>
                </TouchableOpacity>
            </View>
        );
    }
}


