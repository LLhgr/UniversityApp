import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
    },
    content: {
        width: "90%",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 20,
        color: '#FFF'
    },
});

export default styles