import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Goal from './Goal'
import Activity from './Activity'

export default class SuccessScreen extends Component {
    render() {
        const { goals, date, level } = this.props.route.params;

        const printGoal = () => {
            let list = []
            Object.keys(goals).forEach(key => {
                if (goals[key]) {
                    list.push(Goal[key])
                }
            })
            return list.toString();
        }

        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 }}>
                <Text>Well Done !!!</Text>
                <Text>Goals: {printGoal()}</Text>
                <Text>Due date: {JSON.stringify(date)}</Text>
                <Text>Activity Level: {level} - {Activity[level]}</Text>
            </View>
        )
    }
}