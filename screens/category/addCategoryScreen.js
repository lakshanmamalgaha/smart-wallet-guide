import React from 'react';
import {View,Text} from 'react-native';

export default class AddCategoryScreen extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <View style={{
                flex:1
            }}>
                <Text>Add category</Text>
            </View>
        )
    }
}
