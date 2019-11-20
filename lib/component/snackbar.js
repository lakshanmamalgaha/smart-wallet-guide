import React, { Component } from 'react';

import { Animated, View, StyleSheet, Text, TouchableOpacity, Keyboard } from 'react-native';
import SnackbarMessage from "./snackbarMessage";
import {Colors} from "../service/colorService";

class Snackbar extends Component {
    constructor() {
        super();

        this.snackbarOpacity = new Animated.Value(1);

        this.state = {
            messages: [],
            snackbarShown: false
        };
    }


    ShowSuccessMessage(message, toastDefaultColor) {
        let color = toastDefaultColor ? '#ff1e20' : Colors.TOAST_LINK_COLOR;

        let messages = [];
        if (typeof message === 'string') {
            messages = [{ message: message, color: color, type: 'success' }];
        } else if (message instanceof Array) {
            messages = message.map((item, key) => {
                return {
                    message: item,
                    color: color,
                    type: 'success'
                };
            });
        }

        this.ShowSnackBarFunction(messages);
    }

    ShowWarningMessage(message, toastDefaultColor) {
        let color = toastDefaultColor ? '#f88400' : Colors.TOAST_WARNING_BACKGROUND_COLOR;

        let messages = [];
        if (typeof message === 'string') {
            messages = [{ message: message, color: color, type: 'warning' }];
        } else if (message instanceof Array) {
            messages = message.map((item, key) => {
                return {
                    message: item,
                    color: color,
                    type: 'warning'
                };
            });
        }

        this.ShowSnackBarFunction(messages);
    }

    ShowInfoMessage(message, toastDefaultColor) {
        let color = toastDefaultColor ? '#323232' : Colors.TOAST_INFO_BACKGROUND_COLOR;

        let messages = [];
        if (typeof message === 'string') {
            messages = [{ message: message, color: color, type: 'info' }];
        } else if (message instanceof Array) {
            messages = message.map((item, key) => {
                return {
                    message: item,
                    color: color,
                    type: 'info'
                };
            });
        }

        this.ShowSnackBarFunction(messages);
    }

    ShowErrorMessage(message, toastDefaultColor) {
        let color = toastDefaultColor ? '#F44336' : Colors.TOAST_ERROR_BACKGROUND_COLOR;

        let messages = [];
        if (typeof message === 'string') {
            messages = [{ message: message, color: color, type: 'error' }];
        } else if (message instanceof Array) {
            messages = message.map((item, key) => {
                return {
                    message: item,
                    color: color,
                    type: 'error'
                };
            });
        }

        this.ShowSnackBarFunction(messages);
    }

    ShowSnackBarFunction(messages = []) {
        Keyboard.dismiss();
        this.closeSnackbar();

        Animated.timing(
            this.snackbarOpacity,
            {
                toValue: 0,
                duration: 200,
            }
        ).start(() => {
            this.setState({
                messages: messages,
                snackbarShown: true
            });

            Animated.timing(
                this.snackbarOpacity,
                {
                    toValue: 0,
                    duration: 300,
                }
            ).start()


        });

        Animated.timing(
            this.snackbarOpacity,
            {
                toValue: 0,
                duration: 5000,
            }
        ).start(() => {
            this.closeSnackbar()
        });
    }


    closeSnackbar = () => {
        Animated.timing(
            this.snackbarOpacity,
            {
                toValue: 0,
                duration: 200,
            }
        ).start(() => {
            this.setState({ snackbarShown: false })
        });
    };

    renderMessage = (item, key) => {
        return (
            <SnackbarMessage message={item.message} color={item.color} type={item.type} key={key}
                fontStyle={this.props.fontStyle} />
        )
    };

    render() {
        let view = null;
        if (this.state.snackbarShown) {
            view = <View style={[styles.SnackBarContainterView, { flex: 1, flexDirection: 'column' }]}>
                {
                    this.state.messages.map((item, key) => {
                        return this.renderMessage(item, key);
                    })
                }
            </View>;
        }

        return (
            view
        );
    }
}


const styles = StyleSheet.create({
    SnackBarContainterView: {
        position: 'absolute',
        left: 0,
        bottom: 10,
        right: 0,
    }
});

export default Snackbar;
