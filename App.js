import React, { useState, Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CheckBox } from 'react-native-elements'
import DateTimePicker from '@react-native-community/datetimepicker';
import ScrollPicker from 'react-native-picker-scrollview';

const Stack = createStackNavigator();

const Goal = {
  find_workouts: 'Find workouts for my pregnancy',
  maintain_weight: 'Not to gain unnecessary weight',
  birth_preparation: 'Prepare for birth',
  feel_relaxed: 'Feel more relaxed'
};

const Activity = {
  1: 'I don’t exercise.',
  2: 'I rarely exercise.',
  3: 'I sometimes exercise.',
  4: 'I regularly exercise.',
  5: 'I often exercise'
};

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerTransparent: true, }}>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: '' }} />
          <Stack.Screen name="DueDate" component={DueDateScreen} options={{ title: '' }} />
          <Stack.Screen name="ActivityLevel" component={ActivityLevelScreen} options={{ title: '' }} />
          <Stack.Screen name="Success" component={SuccessScreen} options={{ title: '' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

class HomeScreen extends Component {
  state = {
    find_workouts: false,
    maintain_weight: false,
    birth_preparation: false,
    feel_relaxed: false
  }
  check() {
    return this.state.find_workouts || this.state.maintain_weight ||
      this.state.birth_preparation || this.state.feel_relaxed;
  };

  render() {
    return (
      <ImageBackground source={require('./assets/background_image.png')} style={styles.backgroundImage}>
        <View style={styles.flexBottom}>
          <View style={styles.checkboxView}>
            <Text style={styles.headerText}>What are your goals?</Text>
            <Text style={styles.baseText}>Help us tailor program to your needs.</Text>
            <View>
              <CheckBox title={Goal.find_workouts}
                checked={this.state.find_workouts} onPress={() => this.setState({ find_workouts: !this.state.find_workouts })} />
              <CheckBox title={Goal.maintain_weight}
                checked={this.state.maintain_weight} onPress={() => this.setState({ maintain_weight: !this.state.maintain_weight })} />
              <CheckBox left title={Goal.birth_preparation}
                checked={this.state.birth_preparation} onPress={() => this.setState({ birth_preparation: !this.state.birth_preparation })} />
              <CheckBox title={Goal.feel_relaxed}
                checked={this.state.feel_relaxed} onPress={() => this.setState({ feel_relaxed: !this.state.feel_relaxed })} />
            </View>
          </View>
        </View>
        <TouchableOpacity disabled={!this.check()} style={!this.check() ? styles.buttonDisabled : styles.buttonEnabled}
          onPress={() => this.props.navigation.navigate('DueDate', { goals: this.state })}>
          <Text style={{ fontSize: 20, color: 'white' }} >Continue</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}

const DueDateScreen = (props) => {
  const [date, setDate] = useState(new Date());
  const { goals } = props.route.params;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  }

  return (
    <ImageBackground source={require('./assets/background_image.png')} style={styles.backgroundImage}>
      <View style={styles.flexBottom}>
        <View style={{ backgroundColor: 'white' }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={styles.baseText}>Select your estimated due date.</Text>
          </View>
          <DateTimePicker
            onChange={onChange}
            value={date}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.buttonEnabled}
        onPress={() => props.navigation.navigate('ActivityLevel', { goals: goals, date: date })} >
        <Text style={{ fontSize: 20, color: 'white' }} >Continue</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

class ActivityLevelScreen extends Component {
  state = {
    selected: 4
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

        <ImageBackground source={require('./assets/clouds.png')} style={styles.clouds}>
          <ScrollPicker
            dataSource={[1, 2, 3, 4, 5]}
            selectedIndex={3}
            itemHeight={80}
            wrapperHeight={400}
            wrapperColor={'transparent'}
            highlightColor={'grey'}
            renderItem={(data, index, isSelected) => { return (<View><Text>{data}</Text></View>) }}
            onValueChange={(data, selectedIndex) => { this.setState({ selected: data }) }} />
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

class SuccessScreen extends Component {
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
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40}}>
        <Text>Well Done !!!</Text>
        <Text>Goals: {printGoal()}</Text>
        <Text>Due date: {JSON.stringify(date)}</Text>
        <Text>Activity Level: {level} - {Activity[level]}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  flexBottom:
    { flex: 1, justifyContent: 'flex-end' },
  clouds:
    { width: '100%', height: 400 },
  backgroundImage:
    { flex: 1, resizeMode: 'cover' },
  checkboxView:
    { alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', opacity: 0.8 },
  baseText:
    { marginTop: 10, fontSize: 20, },
  headerText:
    { marginTop: 20, fontSize: 30, fontWeight: 'bold', },
  buttonEnabled:
    { width: '100%', height: "10%", backgroundColor: 'aquamarine', alignItems: 'center', justifyContent: 'center' },
  buttonDisabled:
    { width: '100%', height: "10%", backgroundColor: 'grey', alignItems: 'center', justifyContent: 'center' },
})