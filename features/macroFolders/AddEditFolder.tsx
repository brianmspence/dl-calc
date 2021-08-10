import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import SwipeableList, { IconAction, iconActionRender } from '../../components/SwipeableList'
import { Button, Text, TextInput, View } from '../../components/Themed'
import { RootState } from '../../redux/rootReducer'
import { globalSelectors as folderSelectors, MacroFolder } from './folderSetup'
import { addFolder, editFolder } from './macroFolderSlice'

interface ScopeData {
  name: string;
  value: number;
}

export type AddEditFolderProps = {
  folderId?: string;
};

const AddEditFolder = (props: AddEditFolderProps) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  let oldFolder: MacroFolder | undefined = undefined;
  if (props.folderId) {
    oldFolder = useSelector<RootState, MacroFolder | undefined>((state) =>
      folderSelectors.selectById(state, props.folderId!)
    );
  }
  const [name, setName] = useState(oldFolder?.name || "");
  const [scope, setScope] = useState({ ...oldFolder?.scope } || {});
  const [constantName, setConstantName] = useState("");
  const [constantValue, setConstantValue] = useState("");
  const data: ScopeData[] = Object.keys(scope).map((key) => ({
    key,
    name: key,
    value: scope[key],
  }));
  const onSubmit = () => {
    if (props.folderId) {
      //Edit
      dispatch(
        editFolder({
          id: props.folderId,
          changes: { scope: scope, name: name },
        })
      );
    } else {
      //Add
      dispatch(addFolder({ id: "", name, scope, macroIds: [] }));
    }
    navigation.goBack();
  };

  const onAddScope = () => {
    setScope({ ...scope, [constantName]: Number(constantValue) });
    setConstantName("");
    setConstantValue("");
  };

  const submitIcon = oldFolder ? "ios-done-all" : "ios-add-circle-outline";

  const rightActions: IconAction<ScopeData>[] = [
    {
      iconName: "ios-trash",
      color: "red",
      onPress: (item: ScopeData) => {
        delete scope[item.name];
        setScope({ ...scope });
      },
    },
  ];

  const renderItem = (item: ScopeData) => (
    <View style={{ display: "flex", flexDirection: "row", height: 50 }}>
      <TextInput style={[styles.scopeInput, { flex: 2 }]} value={item.name} />
      <View style={styles.separatorV} />
      <TextInput
        style={[styles.scopeInput]}
        keyboardType="number-pad"
        value={item.value.toString()}
      />
    </View>
  );

  return (
    <View style={{ width: "100%", height: "100%" }}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={100}
        behavior="padding"
        style={styles.centeredView}
      >
        <TextInput
          placeholder="Folder Name"
          style={styles.name}
          value={name}
          onChangeText={setName}
        />
        <Text>Constants</Text>
        <View style={{ display: "flex", flexDirection: "row", height: 50 }}>
          <TextInput
            placeholder="Name"
            style={[styles.scopeInput, { flex: 2 }]}
            value={constantName}
            onChangeText={setConstantName}
          />
          <View style={styles.separatorV} />
          <View style={{ flex: 1, display: "flex", flexDirection: "row" }}>
            <TextInput
              placeholder="Value"
              style={styles.scopeInput}
              keyboardType="number-pad"
              onChangeText={setConstantValue}
              value={constantValue}
            />
            <RectButton
              style={styles.addButton}
              onPress={onAddScope}
              underlayColor="white"
            >
              <Ionicons color="white" size={30} name="ios-add-circle-outline" />
            </RectButton>
          </View>
        </View>
        <SwipeableList
          data={data}
          style={{ width: "100%" }}
          renderItem={renderItem}
          renderRightActions={iconActionRender(rightActions)}
        />
        <Button style={styles.button} onPress={onSubmit}>
          <Ionicons color="white" size={50} name={submitIcon} />
        </Button>
      </KeyboardAvoidingView>
    </View>
  );
};

export default AddEditFolder;

const styles = StyleSheet.create({
  name: {
    fontSize: 30,
    width: "100%",
    margin: 10,
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
  scopeInput: {
    flex: 1,
    //   fontSize: 30,
    padding: 5,
  },
  addButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
    alignSelf: "flex-end",
  },
  separatorV: {
    backgroundColor: "rgb(200, 199, 204)",
    height: "100%",
    width: StyleSheet.hairlineWidth,
  },
});
