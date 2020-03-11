import React, { Component } from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import ScrollPicker from 'react-native-picker-scrollview';
import Activity from './Activity'
import styles from './styles'

const ACTIVITY_DEFAULT_VALUE = 4;

export default class ActivityLevelScreen extends Component {
    state = {
        selected: ACTIVITY_DEFAULT_VALUE
    };

    render() {
        const { selected } = this.state;
        const { goals, date } = this.props.route.params;

        return (
            <ImageBackground style={styles.backgroundImage}>
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ marginTop: 60, fontSize: 20 }}>To get your perfect workouts, tell</Text>
                    <Text style={{ marginBottom: 40, fontSize: 20 }}>us your activity level!</Text>
                </View>

                <ImageBackground source={require('../assets/clouds.png')} style={{ width: '100%', height: 400 }}>
                    <ScrollPicker
                        dataSource={Object.keys(Activity)}
                        selectedIndex={ACTIVITY_DEFAULT_VALUE-1}
                        itemHeight={80}
                        wrapperHeight={400}
                        wrapperColor={'transparent'}
                        highlightColor={'grey'}
                        renderItem={(data) => { return (<View><Text>{data}</Text></View>) }}
                        onValueChange={(data) => { this.setState({ selected: data }) }} />
                </ImageBackground>

                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Text style={{ marginTop: 60, marginBottom: 20, fontSize: 20 }}>{Activity[`${selected}`]}</Text>
                </View>
                <TouchableOpacity style={styles.buttonEnabled}
                    onPress={() => this.props.navigation.navigate('Success', { goals: goals, date: date, level: selected })}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Continue</Text>
                </TouchableOpacity>
            </ImageBackground>
        );
    }
}