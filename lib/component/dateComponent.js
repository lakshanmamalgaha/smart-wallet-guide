import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default class DateComponent extends React.Component {
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
                width:this.props.width/4,
                height:'33%',
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',

            }}>
                <TouchableOpacity
                    onPress={
                        this.props.onPress
                    }
                    style={{
                        justifyContent:'center',
                        alignContent:'center',
                        alignItems:'center',
                        height:'100%',
                }}>
                    <Text style={{
                        textAlign:'center',
                        color:this.state.isActive?'#d00':'#000',
                        fontWeight:this.state.isActive?'700':'100',
                        width:this.props.width/4}}>{this.props.label
                    }</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


