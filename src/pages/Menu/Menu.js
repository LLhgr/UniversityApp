import React from "react";
import { View, Text, TextInput, TouchableOpacity, safe } from "react-native";

import styles from "./style";
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Menu({ navigation }) {

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Lista Alunos")}
            >
                <Icon name="user" size={40} color="orange" />
                <Text style={styles.title}>Alunos</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Lista Professores")}
            >
                <Icon name="pencil" size={40} color="orange" />
                <Text style={styles.title}>Professores</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Lista Disciplinas")}
            >
                <Icon name="book" size={40} color="orange" />
                <Text style={styles.title}>Disciplinas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Lista Turmas")}
            >
                <Icon name="users" size={40} color="orange" />
                <Text style={styles.title}>Turmas</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("Lista Historico")}
            >
                <Icon name="database" size={40} color="orange" />
                <Text style={styles.title}>Histórico</Text>
            </TouchableOpacity>
        </View>
    )
}