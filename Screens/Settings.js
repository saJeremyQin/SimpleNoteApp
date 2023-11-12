import { Text, StyleSheet, View } from 'react-native';


const Settings = () => {
    return (
        <View style={styles.body}>
            <Text style={styles.text}>This SimpleNoteApp CopyRight@DaQin, 0451561068</Text>
        </View>
    );
}

const styles= StyleSheet.create({
    body:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'   
    },
    text:{
        color:"#F05801",
        fontSize:22,
    }
});

export default Settings;