import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from "react-native";
import uuid from 'react-native-uuid';

import database from "../../config/config";

import { getFirestore, collection, getDocs, doc, getDoc, setDoc, addDoc } from 'firebase/firestore'

import SelectDropdown from 'react-native-select-dropdown'

export default function CadastroTurma({ navigation }) {

    const [cod_turma, setCodTurma] = useState("");
    const [cod_disc, setCodDisc] = useState("");
    const [cod_prof, setCodProf] = useState("");
    const [ano, setAno] = useState("");
    const [horario, setHorario] = useState("");

    //Modal Select picker

    const [profDataArray, setProfDataArray] = useState([])
    const [profDataArrayName, setProfDataArrayName] = useState([])
    const [selectedProf, setSelectedProf] = useState("")

    const [discDataArray, setDiscDataArray] = useState([])
    const [discDataArrayName, setDiscDataArrayName] = useState([])
    const [selectedDisc, setSelectedDisc] = useState("")



    function AllFieldsAreFilled(idProf, idDisc) {
        let obj = {
            cod_disc: idDisc,
            cod_prof: idProf,
            ano: ano,
            horario: horario,
        }
        for (let item in obj) {
            if (obj[item] == null || obj[item] == "" || obj[item] == undefined) {
                return false
            }
            else return true
        }
    }

    function add() {
        let idProf = findSelectProf()
        let idDisc = findSelectDisc()

        if (!AllFieldsAreFilled(idProf, idDisc)) {
            window.alert("Preencha todos os campos")
            return
        }
        else {
            addDoc(collection(database, "turmas"), {
                cod_turma: cod_turma,
                cod_disc: idDisc,
                cod_prof: idProf,
                ano: ano,
                horario: horario,
            })
            navigation.navigate("Lista Turmas")
        }
    }

    //Professor
    async function getProfData() {
        const collecRef = collection(database, 'professores');
        let lista = [];
        let listaName = []
        await getDocs(collecRef).then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    cod_prof: snapshot.docs[i].data().cod_prof,
                    nome: snapshot.docs[i].data().nome,
                }
                lista.push(obj)
                listaName.push(obj.nome)
            }
            setProfDataArray(lista)
            setProfDataArrayName(listaName)
        })
    }

    function findSelectProf() {
        let res = profDataArray.find(item =>
            item.nome == selectedProf
        )
        return res.id
    }

    //Disciplina
    async function getDiscData() {
        const collecRef = collection(database, 'disciplina');
        let lista = [];
        let listaName = []
        await getDocs(collecRef).then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    cod_disc: snapshot.docs[i].data().cod_disc,
                    nome: snapshot.docs[i].data().nome_disc,
                }
                lista.push(obj)
                listaName.push(obj.nome)
            }
            setDiscDataArray(lista)
            setDiscDataArrayName(listaName)
        })
    }

    function findSelectDisc() {
        let res = discDataArray.find(item =>
            item.nome == selectedDisc
        )
        return res.id
    }


    useEffect(() => {
        setCodTurma(uuid.v4())
        getProfData()
        getDiscData()
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Ano</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 2022"
                onChangeText={setAno}
                value={ano}
            />

            <Text style={styles.label}>Horário</Text>
            <TextInput
                style={styles.input}
                placeholder="Ex: 19:00"
                onChangeText={setHorario}
                value={horario}
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
                data={profDataArrayName}
                defaultButtonText={`Selecione um professor`}
                defaultValue={null}
                onSelect={(selectedItem, index) => {
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    setSelectedProf(selectedItem)
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
                data={discDataArrayName}
                defaultButtonText={`Selecione uma disciplina`}
                defaultValue={null}
                onSelect={(selectedItem, index) => {
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    setSelectedDisc(selectedItem)
                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    return item
                }}
            />


            <TouchableOpacity style={styles.buttonSend} onPress={add}>
                <Text style={styles.buttonText}>Cadastrar turma</Text>
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