
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ActivityIndicator, Image, Button } from "react-native";

//FIREBASE
import { getFirestore, collection, getDocs, deleteDoc, doc, getDoc } from 'firebase/firestore'
import database from "../../config/config";

//ESTILIZAÇÃO
import { FontAwesome } from "@expo/vector-icons";


export default function ListaHistorico({ navigation }) {
    const [historico, setHistorico] = useState([])
    const [loading, setLoading] = useState(false);
    const [alunos, setAlunos] = useState([]);

    async function getDadosAlunos() {
        const collecRef = collection(database, 'alunos');
        let lista = [];
        await getDocs(collecRef).then((snapshot) => {
            for (let i = 0; i < snapshot.docs.length; i++) {
                let obj = {
                    id: snapshot.docs[i].id,
                    nome: snapshot.docs[i].data().nome,
                }
                lista.push(obj)
            }
            setAlunos(lista)
        })
        return lista
    }

    async function interateHistoricoWithName(dataAluno, dataHistorico) {
        dataHistorico.forEach(itemH => {
            dataAluno.forEach(itemA => {
                if (itemH.matricula == itemA.id) {
                    itemH.nome = itemA.nome
                }
            })
        })
        setHistorico(dataHistorico)
    }

    async function getDados() {
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

    async function main() {
        setLoading(true)
        let dataHistorico = await getDados()
        let dataAluno = await getDadosAlunos()
        await interateHistoricoWithName(dataAluno, dataHistorico)
        setLoading(false)
    }

    //DELETE
    function deleteMeeting(id) {
        const docRef = doc(database, "historico", id);

        getDoc(docRef).then((snap) => {
            if (!snap.exists()) {
            } else {
                deleteDoc(docRef).then(console.log("Deletado"))
            }
        })
    }

    async function sortByName() {
        console.log(historico)

        await historico.sort((a, b) => {
            if (a.nome > b.nome) return 1;
            else if (a.nome < b.nome) return -1;
            else return 0
        })

        console.log("DEPOIS", historico)
        setHistorico([])
        setHistorico(historico)
    }

    async function sortByNota() {

        historico.forEach(item => {
            item.nota = parseInt(item.nota)
        })

        await historico.sort((a, b) => {
            if (a.nota > b.nota) return -1;
            else if (a.nota < b.nota) return 1;
            else return 0
        })

        await historico.forEach(item => {
            item.nota = String(item.nota)
        })

        setHistorico([])
        setHistorico(historico)
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
                <View style={styles.containerFilters}>
                    <TouchableOpacity
                        style={styles.buttonFilter} onPress={sortByName}
                    >
                        <Text style={styles.filter}>Filtrar por nome</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.buttonFilter} onPress={sortByNota}
                    >
                        <Text style={styles.filter}>Filtrar por nota</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    showsVerticalScrollIndicator={true}
                    data={historico}
                    renderItem={(item) => {
                        return (
                            <View style={styles.containerFlatlist}>
                                <TouchableOpacity style={styles.content}>
                                    <Text
                                        style={styles.description}
                                    >
                                        {`${item.item.nome}`}
                                    </Text>
                                    <Text
                                        style={styles.description}
                                    >
                                        {`${item.item.frequencia}%`}
                                    </Text>
                                    <Text
                                        style={styles.description}
                                    >
                                        {`${item.item.nota}`}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.delete}
                                    onPress={() => {
                                        deleteMeeting(item.item.id)
                                    }}
                                >
                                    <FontAwesome
                                        name="trash"
                                        size={20}
                                        color="orange"
                                    ></FontAwesome>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.edit}
                                    onPress={() => navigation.navigate("Edit Histórico", {
                                        id: item.item.id,
                                        cod_historico: item.item.cod_historico,
                                        matricula: item.item.matricula,
                                        cod_turma: item.item.cod_turma,
                                        frequencia: item.item.frequencia,
                                        nota: item.item.nota,
                                    })}>
                                    <FontAwesome
                                        name="pencil"
                                        size={20}
                                        color="orange"
                                    ></FontAwesome>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                />
                <TouchableOpacity
                    style={styles.buttonNew}
                    onPress={() => navigation.navigate("Cadastro Histórico")}
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
    containerFilters: {
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        marginBottom: 50
    },
    buttonFilter: {
        backgroundColor: "orange",
        width: "40%",
        padding: 15,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
    },
    filter: {
        color: 'white',
        fontWeight: "bold"
    },
    containerFlatlist: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 20,
    },
    content: {
        width: "70%",
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#2b2b2b",
        padding: 12,
        paddingHorizontal: 20,
        borderRadius: 6,
        flexDirection: 'row'
    },
    delete: {
        marginLeft: 25,
    },
    edit: {
        marginLeft: 25,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginBottom: 10,
    },
    description: {
        fontSize: 15,
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