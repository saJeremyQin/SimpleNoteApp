import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import { windowWidth, windowHeight } from '../Globals/constants';
import { AntDesign } from "@expo/vector-icons";


const NoteCard = ({noteItem}) => {
    const btnDeleteNoteHandler = () => {
        console.log('I am clicked');
        //To be Done
    }
    return (
        <View style={styles.body}>
            <View style={styles.mainContainer}>
                <Image
                    style={styles.image}
                    resizeMode="contain"
                    source={require("../assets/table.png")}
                />
                <View style={styles.noteInfoContainer}>
                    <Text style={styles.noteText}>{noteItem.noteText}</Text>
                    <Text style={styles.cateText}>{noteItem.category}</Text>
                </View>
            </View>
            <View style={styles.deleteContainer}>
                <Pressable style={[styles.deleteBtn, {backgroundColor:'#F05801'}]} onPress={() =>btnDeleteNoteHandler() }>
                    <AntDesign name="minus" size={22} color="white"/>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        display: "flex",
        flexDirection:"row",
        justifyContent:"space-around",
        alignItems:"center",
        marginVertical:0.015*windowHeight,
    },
    mainContainer: {
        overflow: "hidden",
        flexDirection: "row",
        alignItems: "center",
        height:0.12*windowHeight,
        width: "80%",
        borderWidth: 1,
        borderRadius:0.015*windowWidth,
    },
    image:{
        width:0.12*windowHeight,
        height:0.12*windowHeight
    },
    noteInfoContainer:{
        padding:20,
    },
    noteText:{
        color:"#000",
        fontSize:22,
        padding:10,
    },
    cateText:{
        padding:10,
        color:"#887",
        fontSize:18,
    },
    deleteContainer: {
        width:0.06*windowWidth,
        justifyContent:"center",
        alignItems: "flex-end",
    },
    deleteBtn:{
        width:0.04*windowWidth,
        height:0.04*windowWidth,
        borderRadius:0.02*windowWidth,
        justifyContent:"center",
        alignItems:"center"
    },
});

export default NoteCard;