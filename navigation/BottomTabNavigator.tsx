import { Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as React from 'react'

import Colors from '../constants/Colors'
import useColorScheme from '../hooks/useColorScheme'
import AddFolderScreen from '../screens/AddFolderScreen'
import AddMacroScreen from '../screens/AddMacroScreen'
import CalculatorScreen from '../screens/CalculatorScreen'
import DetailsScreen from '../screens/DetailsScreen'
import EditFolderScreen from '../screens/EditFolderScreen'
import EditMacroScreen from '../screens/EditMacroScreen'
import FoldersScreen from '../screens/FoldersScreen'
import MacroResultLogsScreen from '../screens/MacroResultLogsScreen'
import MacroScreen from '../screens/MacroScreen'
import { BottomTabParamList, CalculatorParamList, MarcoTabParamList } from '../types'

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Calculator"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name="Calculator"
        component={CalculatorNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-calculator" color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="Macros"
        component={MacroTabNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-journal" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const MacroTabStack = createStackNavigator<MarcoTabParamList>();

function MacroTabNavigator() {
  return (
    <MacroTabStack.Navigator>
      <MacroTabStack.Screen
        name="FoldersScreen"
        component={FoldersScreen}
        options={{ title: "Folders" }}
      />
      <MacroTabStack.Screen
        name="MacroScreen"
        component={MacroScreen}
        options={({ route }) => ({ title: route.params.folderName })}
      />
      <MacroTabStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ title: "Details" }}
      />
      <MacroTabStack.Screen
        name="AddMacroScreen"
        component={AddMacroScreen}
        options={{ title: "Add Macro" }}
      />
      <MacroTabStack.Screen
        name="EditMacroScreen"
        component={EditMacroScreen}
        options={{ title: "Edit Macro" }}
      />
      <MacroTabStack.Screen
        name="MacroResultLogsScreen"
        component={MacroResultLogsScreen}
        options={({ route }) => ({ title: route.params.name })}
      />
      <MacroTabStack.Screen
        name="AddFolderScreen"
        component={AddFolderScreen}
        options={{ title: "Add Folder" }}
      />
      <MacroTabStack.Screen
        name="EditFolderScreen"
        component={EditFolderScreen}
        options={{ title: "Edit Folder" }}
      />
    </MacroTabStack.Navigator>
  );
}

const CalculatorStack = createStackNavigator<CalculatorParamList>();

function CalculatorNavigator() {
  return (
    <CalculatorStack.Navigator>
      <CalculatorStack.Screen
        name="CalculatorScreen"
        component={CalculatorScreen}
        options={{ headerTitle: "Calculator" }}
      />
      <CalculatorStack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{ headerTitle: "Details" }}
      />
    </CalculatorStack.Navigator>
  );
}
