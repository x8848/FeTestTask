import React, {useState} from 'react';
import { TouchableOpacity, View, Text, ImageBackground } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles'

const DueDateScreen = (props) => {
    const [date, setDate] = useState(new Date());
    const { goals } = props.route.params;

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
    }
    return (
        <ImageBackground source={require('../assets/background_image.png')} style={styles.backgroundImage}>
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

export default DueDateScreen