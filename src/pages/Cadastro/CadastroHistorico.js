import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import uuid from 'react-native-uuid';

import database from "../../config/config";

import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc } from 'firebase/firestore'

import SelectDropdown from 'react-native-select-dropdown'

export default function CadastroHistorico({ navigation }) {

    const [cod_historico, setCodHistorico] = useState("");
    const [cod_turma, setCodTurma] = useState("");
    const [matricula, setMatricula] = useState("");
    const [frequencia, setFrequencia] = useState("");
    const [nota, setNota] = useState("");

    //Modal Select picker

    const [matriculaDataArray, setMatriculaDataArray] = useState([])
    const [matriculaDataArrayName, setMatriculaDataArrayName] = useState([])
    const [selectedMatricula, setSelectedMatricula] = useState("")

    const [turmaDataArray, setTurmaDataArray] = useState([])
    const [turmaDataArrayName, setTurmaDataArrayName] = useState([])
    const [selectedTurma, setSelectedTurma] = useState("")



    function AllFieldsAreFilled(idTurma, idMatricula) {
        let obj = {
            cod_turma: idTurma,
            matricula: idMatricula,
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

    function add() {
        let idMatricula = findSelectMatricula()
        let idTurma = findSelectTurma()

        console.log(idMatricula)
        console.log(idTurma)

        if (!AllFieldsAreFilled(idTurma, idMatricula)) {
            window.alert("Preencha todos os campos")
            return
        }
        else {
            addDoc(collection(database, "historico"), {
                cod_historico: cod_historico,
                cod_turma: idTurma,
                matricula: idMatricula,
                frequencia: frequencia,
                nota: nota,
            })
            navigation.navigate("Lista Historico")
        }
    }

    //Matricula
    async function getMatriculaData() {
        const collecRef = collection(database, 'alunos');
        let lista = [];
        let listaName = []
        await getDocs(collecRef).then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    matricula: snapshot.docs[i].data().matricula,
                    nome: snapshot.docs[i].data().nome,
                }
                lista.push(obj)
                listaName.push(obj.nome)
            }
            setMatriculaDataArray(lista)
            setMatriculaDataArrayName(listaName)
        })
    }

    function findSelectMatricula() {
        let res = matriculaDataArray.find(item =>
            item.nome == selectedMatricula
        )
        return res.id
    }

    //Disciplina
    async function getTurmaData() {
        const collecRef = collection(database, 'turmas');
        let lista = [];
        let listaName = []
        await getDocs(collecRef).then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    cod_turma: snapshot.docs[i].data().cod_turma,
                    horario: snapshot.docs[i].data().horario,
                }
                lista.push(obj)
                listaName.push(obj.horario)
            }
            setTurmaDataArray(lista)
            setTurmaDataArrayName(listaName)
        })
    }

    function findSelectTurma() {
        let res = turmaDataArray.find(item =>
            item.horario == selectedTurma
        )
        return res.id
    }


    useEffect(() => {
        setCodHistorico(uuid.v4())
        getMatriculaData()
        getTurmaData()
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


            <SelectDropdown
                buttonStyle={{
                    backgroundColor: "#171717",
                    borderWidth: 2,
                    borderColor: '#3d3d3d',
                    borderRadius: 10,
                    marginBottom: 40,
                    width: "80%",
                }}
                buttonTextStyle={{
                    color: '#fff'
                }}
                data={matriculaDataArrayName}
                defaultButtonText={`Selecione um aluno`}
                defaultValue={null}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    setSelectedMatricula(selectedItem)
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />

            <SelectDropdown
                buttonStyle={{
                    backgroundColor: "#171717",
                    borderWidth: 2,
                    borderColor: '#3d3d3d',
                    borderRadius: 10,
                    marginBottom: 40,
                    width: "80%",
                }}
                buttonTextStyle={{
                    color: '#fff'
                }}
                data={turmaDataArrayName}
                defaultButtonText={`Selecione uma turma`}
                defaultValue={null}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    setSelectedTurma(selectedItem)
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />


            <TouchableOpacity style={styles.buttonSend} onPress={add}>
                <Text style={styles.buttonText}>Cadastrar Histórico</Text>
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