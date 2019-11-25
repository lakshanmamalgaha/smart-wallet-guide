import React from "react";
import {ActivityIndicator,View} from 'react-native';

class Loader extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={{
                flex:1,
                justifyContent:'center'
            }}>
            <ActivityIndicator size={'small'}
                                                    color={"#000000"}/>
            </View>
        )
    }
}


export default Loader;
