
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image } from "react-native";

//FIREBASE
import { getFirestore, collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import database from "../../config/config";

//ESTILIZAÇÃO
import { FontAwesome } from "@expo/vector-icons";


export default function ListaTurmas({ navigation }) {
    const [turma, setTurma] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getDados() {
        setLoading(true)
        const collecRef = collection(database, 'turmas');
        let lista = [];
        await getDocs(collecRef).then((snapshot) => {
            console.log("SNAPSHOT:::", snapshot)
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    cod_turma: snapshot.docs[i].data().cod_turma,
                    cod_disc: snapshot.docs[i].data().cod_disc,
                    cod_prof: snapshot.docs[i].data().cod_prof,
                    ano: snapshot.docs[i].data().ano,
                    horario: snapshot.docs[i].data().horario,
                }
                lista.push(obj)
            }
            console.log("LISTA:::", lista[0].cod_prof)
            setTurma(lista)
        })
        setLoading(false)
    }

    useEffect(() => {
        getDados()
    }, [])

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="orange" />
            </View>
        );
    }
    else {
        return (
            <View style={styles.container}>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={turma}
                    renderItem={(item) => {
                        return (
                            <View style={styles.containerFlatlist}>
                                <TouchableOpacity style={styles.content} onPress={() => navigation.navigate("Menu", {
                                    id: item.item.id,
                                    nome_disc: item.item.nome_disc,
                                    cod_disc: item.item.cod_disc,
                                    carga_hor: item.item.carga_hor,
                                })}>
                                    <Text
                                        style={styles.description}
                                    >
                                        {`${item.item.horario} h`}
                                    </Text>
                                    <Text
                                        style={styles.description}
                                    >
                                        {`${item.item.ano} ano`}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
                <TouchableOpacity
                    style={styles.buttonNew}
                    onPress={() => navigation.navigate("Cadastro Turma")}
                >
                    <Text style={styles.iconButton}>+</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#171717",
        paddingTop: 20,
    },
    containerFlatlist: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 5,
    },
    content: {
        width: "90%",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#2b2b2b",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 20,
        flexDirection: 'row'
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom: 10,
    },
    description: {
        fontSize: 20,
        color: "#fff",
        fontWeight: "bold",
    },
    icon: {
        marginRight: 5,
    },
    buttonNew: {
        width: 60,
        height: 60,
        position: "absolute",
        bottom: 30,
        right: 20,
        backgroundColor: "orange",
        borderRadius: 20,
        alignItems: "center",
    },
    iconButton: {
        color: "#ffffff",
        fontSize: 40,
        fontWeight: "bold"
    },
});