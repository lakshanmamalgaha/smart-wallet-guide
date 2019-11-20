import React from "react";
import { Animated, StyleSheet, Text, TouchableOpacity, View,} from 'react-native';
import { Colors } from "../service/colorService";

class SnackbarMessage extends React.Component {
    constructor(props) {
        super(props);

        this.snackbarOpacity = new Animated.Value(1);

        this.state = {
            snackbarShown: true,
          
        };
    }

    closeSnackbarMessage = () => {
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

    render() {
        let color = this.props.color;

        let message = null;
        if (this.state.snackbarShown) {
            message = <Animated.View
                style={[{
                    opacity: this.snackbarOpacity
                }]}>
                <View style={{ flex: 1, backgroundColor: color,marginHorizontal:5, borderRadius: 3 }}>
                    <TouchableOpacity activeOpacity={1} onPress={this.closeSnackbarMessage}
                        style={{ flex: 1, flexDirection: 'row' }}>

                        <View style={{ flexDirection: 'row', flex: 1, margin: 15, marginLeft: 10, marginRight: 10 }}>

                            <View
                                style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start' }}>
                                
                            </View>

                            <View style={{ flex: 1, marginLeft: 10, marginRight: 5 }}>
                                <Text style={[styles.SnackBarInsideTextStyle, { color: Colors.TOAST_FONT_COLOR }, this.props.fontStyle]}>{this.props.message}</Text>
                            </View>
                        </View>

                    </TouchableOpacity>
                </View>

            </Animated.View>
        }

        return (
            message
        )
    }
}

export default SnackbarMessage;

const styles = StyleSheet.create({
    SnackBarInsideTextStyle: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 0
    },
});