
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image } from "react-native";

//FIREBASE
import { getFirestore, collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import database from "../../config/config";

//ESTILIZAÇÃO
import { FontAwesome } from "@expo/vector-icons";


export default function DetailsTurmas({ navigation, route }) {
    const [turma, setTurma] = useState([]);
    const [alunos, setAlunos] = useState([]);
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

    async function getDadosAlunos() {
        const collecRef = collection(database, 'alunos');
        let lista = [];
        await getDocs(collecRef).then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    nome: snapshot.docs[i].data().nome,
                    foto: snapshot.docs[i].data().foto,
                    matricula: snapshot.docs[i].data().matricula,
                }
                lista.push(obj)
            }
            setAlunos(lista)
        })
        return lista
    }

    async function interateHistoricoWithAluno(dataAluno, dataHistorico) {
        dataHistorico.forEach(itemH => {
            dataAluno.forEach(itemA => {
                if (itemH.matricula == itemA.id) {
                    itemH.nome = itemA.nome
                    itemH.foto = itemA.foto
                    itemH.matricula = itemA.matricula
                    itemH.alunoId = itemA.id
                }
            })
        })
        setHistorico(dataHistorico)
    }

    async function findAlunosByTurma(dataHistorico) {
        let arrAux = []
        dataHistorico.forEach(item => {
            if (item.cod_turma == route.params.id) {
                arrAux.push(item)
            }
        })
        setTurma(arrAux)
    }

    async function main() {
        setLoading(true)
        const dataHistorico = await getDadosHistorico()
        const dataAluno = await getDadosAlunos()
        await interateHistoricoWithAluno(dataAluno, dataHistorico)
        await findAlunosByTurma(dataHistorico)
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
                data={turma}
                renderItem={(item) => {
                    return (
                        <View style={styles.containerFlatlist}>
                            <TouchableOpacity style={styles.content} onPress={() => navigation.navigate("Detalhes Historico do Aluno", {
                                matricula: item.item.matricula,
                                foto: item.item.foto,
                                nome: item.item.nome,
                                alunoId: item.item.alunoId,
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