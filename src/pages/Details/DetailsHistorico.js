
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image } from "react-native";

//FIREBASE
import { getFirestore, collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import database from "../../config/config";

//ESTILIZAÇÃO
import { FontAwesome } from "@expo/vector-icons";


export default function DetailsHistorico({ navigation, route }) {
    const [historico, setHistorico] = useState([]);
    const [loading, setLoading] = useState(false);

    async function getDadosHistorico() {
        const collecRef = collection(database, 'historico');
        let lista = [];
        await getDocs(collecRef).then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    cod_historico: snapshot.docs[i].data().cod_historico,
                    matricula: snapshot.docs[i].data().matricula,
                    cod_turma: snapshot.docs[i].data().cod_turma,
                    frequencia: snapshot.docs[i].data().frequencia,
                    nota: snapshot.docs[i].data().nota,
                }
                lista.push(obj)
            }
            setHistorico(lista)
        })
        return lista
    }

    async function findHistoricoByAluno(dataHistorico) {
        let arrAux = []
        dataHistorico.forEach(item => {
            if (item.matricula == route.params.alunoId) {
                arrAux.push(item)
            }
        })
        setHistorico(arrAux)
    }

    async function main() {
        setLoading(true)
        const dataHistorico = await getDadosHistorico()
        await findHistoricoByAluno(dataHistorico)
        setLoading(false)
    }

    useEffect(() => {
        main()
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
                data={historico}
                renderItem={(item) => {
                    return (
                        <View style={styles.containerFlatlist}>
                            <TouchableOpacity style={styles.content}>
                                <Image
                                    style={styles.image}
                                    source={{
                                        uri: `${route.params.foto}`,
                                    }}
                                />
                                <Text
                                    style={styles.description__nome}
                                >
                                    {route.params.nome}
                                </Text>
                                <Text
                                    style={styles.description}
                                >
                                    {`Frequência: ${item.item.frequencia}%`}
                                </Text>
                                <Text
                                    style={styles.description}
                                >
                                    {`Nota: ${item.item.nota}`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )
                }}
            />
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
        height: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
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
        marginBottom: 20,
    },
    description__nome: {
        fontSize: 30,
        marginBottom: 50,
        color: "orange",
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