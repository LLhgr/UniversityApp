import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
        alignItems: "center",
        justifyContent: "center",
    },
    button: {
        width: "90%",
        height: 70,
        backgroundColor: "#2b2b2b",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        marginBottom: 35,
    },
    title: {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 30,
        marginLeft: 20,
    }
});

export default styles