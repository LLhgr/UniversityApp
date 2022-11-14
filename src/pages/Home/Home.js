import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./style";

export default function Home({ navigation }) {

    const imagem = `https://i.pinimg.com/736x/37/be/88/37be8803ec8f34473f6fb5fd1a449642.jpg`

    const [luiz, setLuiz] = useState("")
    const [davi, setDavi] = useState("")
    const [gabriel, setGabriel] = useState("")

    //Caso o fetch não funcione, uma imagem padrão é estabelecida

    function imagemLuiz() {
        fetch("https://avatars.dicebear.com/api/male/luiz.svg?background=%230000ff").then(res => {
            if (res.status == 200) {
                setLuiz(res.url)
            }
            else {
                setLuiz(imagem)
            }

        })
    }

    function imagemDavi() {
        fetch("https://avatars.dicebear.com/api/male/davi.svg?background=%230000ff").then(res => {
            if (res.status == 200) {
                setDavi(res.url)
            }
            else {
                setDavi(imagem)
            }
        })
    }

    function imagemGabriel() {
        fetch("https://avatars.dicebear.com/api/male/gabriel.svg?background=%230000ff").then(res => {
            if (res.status == 200) {
                setGabriel(res.url)
            }
            else {
                setGabriel(imagem)
            }
        })
    }

    useEffect(() => {
        imagemLuiz()
        imagemDavi()
        imagemGabriel()
    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${luiz}`,
                    }}
                />
                <Text style={styles.name}>
                    Luiz Henrique - 200313
                </Text>
            </View>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${gabriel}`,
                    }}
                />
                <Text style={styles.name}>
                    Gabriel Lucas - 200840
                </Text>
            </View>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${davi}`,
                    }}
                />
                <Text style={styles.name}>
                    Davi Oliveira - 200913
                </Text>
            </View>
        </View>
    )
}