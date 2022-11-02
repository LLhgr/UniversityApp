import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import uuid from 'react-native-uuid';

import database from "../../config/config";

import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc, updateDoc } from 'firebase/firestore'

import SelectDropdown from 'react-native-select-dropdown'

export default function EditHistorico({ navigation, route }) {

    const [frequencia, setFrequencia] = useState("");
    const [nota, setNota] = useState("");

    //Modal Select picker



    const [teste, setTeste] = useState("")


    function AllFieldsAreFilled() {
        let obj = {
            frequencia: frequencia,
            nota: nota,
        }
        console.log(obj)
        for (let item in obj) {
            if (obj[item] == null || obj[item] == "" || obj[item] == undefined) {
                console.log(item)
                return false
            }
            else return true
        }
    }

    function att() {

        if (!AllFieldsAreFilled()) {
            window.alert("Preencha todos os campos")
            return
        }
        else {
            const docRef = doc(database, "historico", `${route.params.id}`)
            updateDoc(docRef, {
                frequencia: frequencia,
                nota: nota,
            })
            navigation.navigate("Lista Historico")
        }
    }

    useEffect(() => {
        setFrequencia(route.params.frequencia)
        setNota(route.params.nota)
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Frequência</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 80"
                onChangeText={setFrequencia}
                value={frequencia}
            />

            <Text style={styles.label}>Nota</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 8.00"
                onChangeText={setNota}
                value={nota}
            />

            <TouchableOpacity style={styles.buttonSend} onPress={att}>
                <Text style={styles.buttonText}>Atualizar Histórico</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
        alignItems: "center",
        justifyContent: "center",
    },
    label: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        color: '#fff'
    },
    input: {
        backgroundColor: "#3d3d3d",
        width: "80%",
        padding: 10,
        borderRadius: 10,
        color: "#fff",
        marginBottom: 40,
        borderColor: "#c7c7c7",
        borderWidth: 2,
        borderWidth: 0,
    },
    buttonSend: {
        backgroundColor: "orange",
        padding: 20,
        borderRadius: 30,
    },
    buttonText: {
        color: "#ffffff",
        fontWeight: "bold"
    },
});