
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image } from "react-native";

//FIREBASE
import { getFirestore, collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import database from "../../config/config";

//ESTILIZAÇÃO
import { FontAwesome } from "@expo/vector-icons";


export default function ListaAlunos({ navigation }) {
    const [alunos, setAlunos] = useState([])
    const [loading, setLoading] = useState(false);

    async function getDados() {
        setLoading(true)
        const collecRef = collection(database, 'alunos');
        let lista = [];
        await getDocs(collecRef).then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    nome: snapshot.docs[i].data().nome,
                    matricula: snapshot.docs[i].data().matricula,
                    endereco: snapshot.docs[i].data().endereco,
                    foto: snapshot.docs[i].data().foto,
                    cidade: snapshot.docs[i].data().cidade,
                }
                lista.push(obj)
            }
            setAlunos(lista)
        })
        setLoading(false)
    }



    useEffect(() => {
        getDados()
        console.log("chamado")
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
                    data={alunos}
                    renderItem={(item) => {
                        return (
                            <View style={styles.containerFlatlist}>
                                <TouchableOpacity style={styles.content} onPress={() => navigation.navigate("Menu", {
                                    id: item.item.id,
                                    nome: item.item.nome,
                                    matricula: item.item.matricula,
                                    endereco: item.item.endereco,
                                    foto: item.item.foto,
                                    cidade: item.item.cidade,
                                })}>
                                    <Image
                                        style={styles.image}
                                        source={{
                                            uri: `${item.item.foto}`,
                                        }}
                                    />
                                    <Text
                                        style={styles.description}
                                    >
                                        {item.item.nome}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
                <TouchableOpacity
                    style={styles.buttonNew}
                    onPress={() => navigation.navigate("Cadastro Aluno")}
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
        justifyContent: 'center',
        backgroundColor: "#2b2b2b",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        marginBottom: 20,
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