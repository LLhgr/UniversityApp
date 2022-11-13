import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";

import styles from "./style";

export default function Home({ navigation }) {

    const imagem = `https://i.pinimg.com/736x/37/be/88/37be8803ec8f34473f6fb5fd1a449642.jpg`


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
                    Gabriel Lucas - 200840
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
                    Davi Oliveira - 200913
                </Text>
            </View>
        </View>
    )
}