import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'

import { Button, Text, TextInput, View } from '../../components/Themed'
import { RootState } from '../../redux/rootReducer'
import { addMacro, editMacro, Macro, macroSelectors } from './macroSlice'

export type AddEditMacroProps = {
  folderId: string;
  macroId?: string;
};

const AddEditMacro = (props: AddEditMacroProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let oldMacro: Macro | undefined = undefined;
  if (props.macroId) {
    oldMacro = useSelector<RootState>((state) =>
      macroSelectors.selectById(state, props.macroId!)
    ) as Macro | undefined;
  }
  const [name, setName] = useState(oldMacro?.name || "");
  const [equation, setEquation] = useState(oldMacro?.equation || "");

  const onSubmit = () => {
    if (props.macroId) {
      //Edit
      dispatch(
        editMacro({
          id: props.macroId,
          changes: { name, equation, results: [] },
        })
      );
    } else {
      //Add
      dispatch(addMacro({ name, equation, results: [] }, props.folderId));
    }
    navigation.goBack();
  };

  const submitIcon = oldMacro ? "ios-checkmark-done" : "ios-add-circle-outline";

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <KeyboardAvoidingView behavior="padding" style={styles.centeredView}>
        <Text>Name:</Text>
        <TextInput
          style={styles.textEquation}
          value={name}
          onChangeText={setName}
        />
        <Text>Equation:</Text>
        <TextInput
          autoCorrect={false}
          style={styles.textEquation}
          value={equation}
          onChangeText={setEquation}
        />
        <Button style={styles.button} onPress={onSubmit}>
          <Ionicons color="white" size={50} name={submitIcon} />
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddEditMacro;

const styles = StyleSheet.create({
  textEquation: {
    fontSize: 30,
    borderStyle: "solid",
    borderColor: "gray",
    borderWidth: 3,
    width: "100%",
    minHeight: 50,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  buttonText: {
    fontSize: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    flexDirection: "column",
    width: "100%",
    backgroundColor: "transparent",
  },
});
