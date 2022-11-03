import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import uuid from 'react-native-uuid';

import database from "../../config/config";

import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc } from 'firebase/firestore'

export default function CadastroProfessor({ navigation }) {

    const [cod_prof, setCodProf] = useState("");
    const [nome, setNome] = useState("");
    const [foto, setFoto] = useState("");
    const [endereco, setEndereco] = useState("");
    const [cidade, setCidade] = useState("");

    function AllFieldsAreFilled() {
        let obj = {
            nome: nome,
            endereco: endereco,
            cidade: cidade,
        }

        for (let item in obj) {
            if (obj[item] == null || obj[item] == "" || obj[item] == undefined) {
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
            addDoc(collection(database, "professores"), {
                cod_prof: cod_prof,
                nome: nome,
                endereco: endereco,
                cidade: cidade,
            })
            navigation.navigate("Lista Professores")
        }
    }

    useEffect(() => {
        setCodProf(uuid.v4())
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Marcos Antunes"
                onChangeText={setNome}
                value={nome}
            />
            <Text style={styles.label}>Endereco</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Rua brasil, 123"
                onChangeText={setEndereco}
                value={endereco}
            />
            <Text style={styles.label}>Cidade</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: Sorocaba-SP"
                onChangeText={setCidade}
                value={cidade}
            />

            <TouchableOpacity style={styles.buttonSend} onPress={add}>
                <Text style={styles.buttonText}>Cadastrar professor</Text>
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