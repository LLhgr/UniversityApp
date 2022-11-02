// LIBS AND UTILS
import React, { useContext } from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';

// PAGES
import Config from "./pages/Config/Config";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";

// LISTAGENS
import ListaAlunos from "./pages/Listagem/ListaAlunos";
import ListaDisciplinas from "./pages/Listagem/ListaDisciplinas";
import ListaProfessores from "./pages/Listagem/ListaProfessores";
import ListaTurmas from "./pages/Listagem/ListaTurmas";
import ListaHistorico from "./pages/Listagem/ListaHistorico";

// CADASTROS
import CadastroAluno from "./pages/Cadastro/CadastroAlunos";
import CadastroProfessor from "./pages/Cadastro/CadastroProfessores";
import CadastroDisciplina from "./pages/Cadastro/CadastroDisciplinas";
import CadastroTurma from "./pages/Cadastro/CadastroTurmas";
import CadastroHistorico from "./pages/Cadastro/CadastroHistorico";

// EDIT
import EditHistorico from "./pages/Edit/EditHistorico";

//Details
import DetailsTurmas from "./pages/Details/DetailsTurma";


const Stack = createStackNavigator();

export default function Router() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    );
}

function RootNavigator() {
    return (
        <Stack.Navigator initialRouteName="Root">
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Lista Alunos"
                component={ListaAlunos}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            <Stack.Screen
                name="Lista Disciplinas"
                component={ListaDisciplinas}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            <Stack.Screen
                name="Lista Professores"
                component={ListaProfessores}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            <Stack.Screen
                name="Lista Turmas"
                component={ListaTurmas}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            <Stack.Screen
                name="Lista Historico"
                component={ListaHistorico}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            {/* CADASTROS */}
            <Stack.Screen
                name="Cadastro Aluno"
                component={CadastroAluno}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            <Stack.Screen
                name="Cadastro Professor"
                component={CadastroProfessor}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            <Stack.Screen
                name="Cadastro Disciplina"
                component={CadastroDisciplina}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            <Stack.Screen
                name="Cadastro Turma"
                component={CadastroTurma}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            <Stack.Screen
                name="Cadastro Histórico"
                component={CadastroHistorico}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            {/* EDIT */}
            <Stack.Screen
                name="Edit Histórico"
                component={EditHistorico}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
            {/* DETAILS */}
            <Stack.Screen
                name="Detalhes Turma"
                component={DetailsTurmas}
                options={{
                    headerShown: true,
                    headerTintColor: "orange",
                    headerStyle: {
                        backgroundColor: '#171717',
                    },

                }}
            />
        </Stack.Navigator>
    );
}

const BottomTab = createBottomTabNavigator();

function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: true,
                tabBarStyle: {
                    height: 55,
                    paddingTop: 5,
                    paddingBottom: 5,
                    backgroundColor: "#171717",
                    borderTopColor: "orange",
                },
                tabBarHideOnKeyboard: true, // TODO hide bottom navigation when typing
                tabBarActiveTintColor: "orange",
                tabBarInactiveTintColor: "#FFF",
            }}
        >
            <BottomTab.Screen
                name="Home"
                component={Home}
                options={{
                    tabBarLabel: "Home",
                    tabBarIcon: () => (
                        <Icon name="home" color="orange" size={25} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Menu"
                component={Menu}
                options={{
                    tabBarLabel: "Menu",
                    tabBarIcon: () => (
                        <Icon name="bars" color="orange" size={25} />
                    ),
                }}
            />
            <BottomTab.Screen
                name="Config"
                component={Config}
                options={{
                    tabBarLabel: "Config",
                    tabBarIcon: () => (
                        <Icon name="gears" color="orange" size={25} />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}