import React, { Component } from 'react';
import {Platform, TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import firebase from 'react-native-firebase';
import moment from 'moment';
import DateTimePicker from "react-native-modal-datetime-picker";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {ListItem} from "react-native-elements";
import AsyncStorage from '@react-native-community/async-storage';

export default class NotificationScreen extends Component {

    state = {
        enableNotification: true,
        isDateTimePickerVisible: false,
        notificationTime: moment({ hour: 17 }),
    };

    componentDidMount() {
        this.init();
        this.setReminder();
    }

    componentDidUpdate(prevProps, prevState) {
        const { notificationTime, enableNotification } = this.state;

        if (enableNotification !== prevState.enableNotification || notificationTime !== prevState.notificationTime) {
            this.setReminder();
        }
    }

    init = () => {
        AsyncStorage.getItem('Time').then(response => {
            if (response !== null) {
                this.setState({
                    notificationTime: moment(JSON.parse(response)),
                })
            }})
    }

    setReminder = async () => {
        const { notificationTime, enableNotification } = this.state;

        if (enableNotification) {
            firebase.notifications().scheduleNotification(this.buildNotification(), {
                fireDate: notificationTime.valueOf(),
                repeatInterval: 'day',
                exact: true,
            });
        } else {
            return false;
        }
    };

    buildNotification = () => {
        const title = Platform.OS === 'android' ? 'Daily Reminder' : '';
        const notification = new firebase.notifications.Notification()
            .setNotificationId('1')
            .setTitle(title)
            .setBody('Add Your Expenses and Income')
            .android.setPriority(firebase.notifications.Android.Priority.High)
            .android.setChannelId('reminder')
            .android.setAutoCancel(true);

        return notification;
    };

    enableNotification = value => {
        this.setState({
            enableNotification: value,
        });
    };

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        this.hideDateTimePicker();
        AsyncStorage.setItem("Time",JSON.stringify(date)).then(response=>{
        });
        this.setState({
            notificationTime: moment(date),
        });
    };

    goBack= () => {
        this.props.navigation.goBack();
    };

    render() {
        const { enableNotification, isDateTimePickerVisible, notificationTime } = this.state;
        return (
            <View style={{
                flex:1,
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
                        Notifications
                    </Text>
                </View>
                    <ListItem
                        title="Notification"
                        bottomDivider
                        titleStyle={styles.titleStyle}
                        switch={{ onValueChange: this.enableNotification, value: enableNotification }}
                    />
                    <ListItem
                        title="Time"
                        titleStyle={styles.titleStyle}
                        onPress={this.showDateTimePicker}
                        rightElement={<Text style={{ opacity: 0.7 }}>{moment(notificationTime).format('LT')}</Text>}
                    />

                    <DateTimePicker
                        isVisible={isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                        mode="time"
                        is24Hour={false}
                        date={new Date(notificationTime)}
                        titleIOS="Pick your Notification time"
                    />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEEFF0',
    },
    cardTitleView: {
        paddingHorizontal: 15,
        paddingTop: 15,
        paddingBottom: 8,
    },
    cardTitle: {
        fontSize: 15,
        color: '#585858',
        fontWeight: '600',
    },
    titleStyle: {
        fontSize: 20,
        color: '#585858',
    },
});
