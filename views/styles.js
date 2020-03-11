import {StyleSheet} from 'react-native';

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

export default styles