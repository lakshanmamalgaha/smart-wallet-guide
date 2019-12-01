import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet} from 'react-native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import Webservice from "../../lib/api/webService";


export default class LocationScreen extends React.Component{
    constructor(props){
        super(props)
        this.state={
            latitude: 37.78825,
            longitude: -122.4324,
            near:[],
            markers:[],
        }
        this.init()



    }

    init = ()=>{
        Geolocation.getCurrentPosition(info =>{
            this.setState({
                latitude: info.coords.latitude,
                longitude: info.coords.longitude
            },()=>{
                this.fetchLocations()
            })
        } )
    }

    fetchLocations = ()=>{
        let url='https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+this.state.latitude
            +','+this.state.longitude+'&radius=500&types=atm&key=API_KEY';
        fetch(url).then((response) => response.json().then(responseData => {

            let near=[];
            for(let i=0;i<responseData.results.length;i++){
                near.push(responseData.results[i])

            }
            this.setState({
                markers:near
            })

        }))
    }

    goBack= () => {
        this.props.navigation.goBack();
    };
    render(){
        return(
            <View style={{
                flex:1
            }}>
                <View style={{
                    flexDirection:'row',
                    zIndex:1000,
                    backgroundColor:'#2cb40e'
                }}>
                    <TouchableOpacity
                        onPress={this.goBack}
                        style={{
                            paddingHorizontal:20,
                            paddingVertical:10
                        }}>
                        <MaterialIcons name={'arrow-back'} color={'#000'} size={30}/>
                    </TouchableOpacity>
                    <Text style={{
                        fontSize:20,
                        paddingVertical:10
                    }}>
                        Loacation
                    </Text>
                </View>
                <View style={{
                    flex:1
                }}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={{
                            height: "100%",
                            width: "100%",
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                        }}
                        region={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}
                    >
                        {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
                            coordinate={{"latitude":this.state.latitude,"longitude":this.state.longitude}}
                            title={"Your Location"}
                        />}
                        {this.state.markers.map((marker, i) => (
                            <MapView.Marker
                                key={i}
                                image={{ uri: marker.icon}}
                                title={marker.name}
                                coordinate={{
                                    latitude: marker.geometry.location.lat,
                                    longitude: marker.geometry.location.lng
                                }}
                            />
                        ))}
                    </MapView>
                </View>
            </View>
        )
    }
}
