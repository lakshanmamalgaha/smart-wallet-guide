import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default class ItemComponent extends React.Component {
    constructor(props){
        super(props);
        this.state={
            isActive: props.isActive,
        };
    }

    toggle=()=>{
        if (this.state.isActive === false) {
            this.setState({isActive: true}, () => {
                this.props.selectItem({label:this.props.label,icon:this.props.icon});
            });
        }
    };

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({isActive: nextProps.isActive})
    };
    render() {
        return (
            <TouchableOpacity
                onPress={this.toggle}
                style={{
                flexDirection:'row',
                paddingVertical:10,
                paddingHorizontal:10,
                backgroundColor:this.state.isActive?'#feff47': "#fff"
            }}>
                <MaterialCommunityIcons name={this.props.icon} size={20} />
                <Text style={{marginLeft:20}}>{this.props.label}</Text>
            </TouchableOpacity>
        );
    }
}


