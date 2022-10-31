import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import uuid from 'react-native-uuid';

import database from "../../config/config";

import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc } from 'firebase/firestore'

export default function CadastroDisciplina({ navigation }) {

    const [cod_disc, setCodDisc] = useState("");
    const [carga_hor, setCargaHor] = useState("");
    const [nome_disc, setNomeDisc] = useState("");

    function AllFieldsAreFilled() {
        let obj = {
            carga_hor: carga_hor,
            nome_disc: nome_disc,
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

    function add() {
        if (!AllFieldsAreFilled()) {
            window.alert("Preencha todos os campos")
            return
        }
        else {
            addDoc(collection(database, "disciplina"), {
                cod_disc: cod_disc,
                carga_hor: carga_hor,
                nome_disc: nome_disc,
            })
            navigation.navigate("Lista Disciplinas")
        }
    }

    useEffect(() => {
        setCodDisc(uuid.v4())
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome da disciplina</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Programa Orientada à Objetos"
                onChangeText={setNomeDisc}
                value={nome_disc}
            />
            <Text style={styles.label}>Carga Horária em horas</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 8"
                onChangeText={setCargaHor}
                value={carga_hor}
            />

            <TouchableOpacity style={styles.buttonSend} onPress={add}>
                <Text style={styles.buttonText}>Cadastrar disciplina</Text>
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