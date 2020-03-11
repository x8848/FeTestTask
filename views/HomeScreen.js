import React, { Component } from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import { CheckBox } from 'react-native-elements'
import Goal from './Goal'
import styles from './styles'

export default class HomeScreen extends Component {
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
      <ImageBackground source={require('../assets/background_image.png')} style={styles.backgroundImage}>
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
          <Text style={{ fontSize: 20, color: 'white' }}>Continue</Text>
        </TouchableOpacity>
      </ImageBackground>
    );
  }
}