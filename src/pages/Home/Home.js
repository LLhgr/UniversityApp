import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./style";

export default function Home({ navigation }) {

    const [imagem, setImagem] = useState("")

    function findImage() {
        let url = `https://avatars.dicebear.com/api/male/john.svg?background=%230000ff`

        fetch(url).then((res) => {
            console.log(res)
            setImagem(res.url)
        })

    }

    useEffect(() => {
        findImage()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${imagem}`,
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
                        uri: `${imagem}`,
                    }}
                />
                <Text style={styles.name}>
                    Gabriel Lucas - 200313
                </Text>
            </View>
            <View style={styles.content}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${imagem}`,
                    }}
                />
                <Text style={styles.name}>
                    Davi Oliveira - 200313
                </Text>
            </View>
        </View>
    )
}