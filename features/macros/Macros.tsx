import { Ionicons } from '@expo/vector-icons'
import { DiceEvaluator } from 'dl-eval'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import { ResultDetails } from '../../components/ResultDetails'
import { TextInput, useThemeColor, View } from '../../components/Themed'
import { RootState } from '../../redux/rootReducer'
import { SavedResult } from '../../types'
import { globalSelectors as folderSelectors } from '../macroFolders/folderSetup'
import MacroList from './MacroList'
import { addMacro, addMacroResult, deleteMacro, macroSelectors } from './macroSlice'

const diceCalculator = new DiceEvaluator();

interface MacrosProps {
  folderId: string;
  showResult: (result: ResultDetails) => void;
  openAddMacro: () => void;
  openEditMacro: (macroId: string) => void;
  openMacroLogs: (id: string, name: string) => void;
  editFolder: (folderId: string) => void;
}

const Macros = (props: MacrosProps) => {
  const dispatch = useDispatch();
  const iconColor = useThemeColor({}, "icon");
  const [searchString, setSearchString] = useState<string>();
  const folder = useSelector((state: RootState) =>
    folderSelectors.selectById(state, props.folderId)
  );
  const macroDict = useSelector(macroSelectors.selectEntities);
  //Get marcos from ids. The macros should exist but filter the undefined results
  const macroList = folder?.macroIds.map((id) => macroDict[id]!).filter(m => m) || [];
  const filteredMacroList =
    searchString && searchString.trim().length
      ? macroList.filter((m) =>
          m.name.toLowerCase().includes(searchString.toLowerCase())
        )
      : macroList;

  const onSearchTextChange = (text: string) => {
    setSearchString(text);
  };

  const onMacroLogs = (id: string) => {
    const macro = macroDict[id];
    macro && props.openMacroLogs(macro.id!, macro.name);
  };

  const onAdd = () => {
    props.openAddMacro();
  };

  const onMacroDelete = (id: string) => {
    dispatch(deleteMacro(id, props.folderId));
  };

  const onMacroDuplicate = (id: string) => {
    //TODO Open the edit window to allow rename?
    const macro = macroDict[id];
    macro && dispatch(addMacro({ ...macro, results: [] }, props.folderId));
  };

  const onMacroEdit = (id: string) => {
    props.openEditMacro(id);
  };

  const onRoll = (id: string) => {
    const macro = macroDict[id];
    if (macro === undefined) {
      return false;
    }
    try {
      const r = diceCalculator.eval(macro.equation, folder?.scope);
      const result: SavedResult = {
        ...r,
        equation: macro.equation,
        scope: folder?.scope,
      };
      dispatch(addMacroResult({ id, result }));
    } catch (error) {
      //TODO show error message? Maybe on create/edit?
      //Well since the scope can be removed, this can still have an error
      return false;
    }
    return true;
  };

  return (
    <>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Ionicons style={{padding: 10}} color={iconColor} size={25} name="ios-search" />
        <TextInput
          style={{
            flex: 1,
            fontSize: 30,
            padding: 5,
            margin: 10,
            borderColor: "grey",
            borderWidth: 2,
          }}
          clearButtonMode="always"
          onChangeText={onSearchTextChange}
        />
        <RectButton
          style={[styles.optionsButton]}
          onPress={() => props.editFolder(props.folderId)}
          underlayColor="white"
        >
          <Ionicons color={iconColor} size={30} name="ios-options" />
        </RectButton>
      </View>
      <View style={styles.separator} />
      <MacroList
        data={filteredMacroList}
        onDelete={onMacroDelete}
        onShowResult={props.showResult}
        onDuplicate={onMacroDuplicate}
        onEdit={onMacroEdit}
        onLogs={onMacroLogs}
        onRoll={onRoll}
      />
      <RectButton
        style={styles.addButton}
        onPress={onAdd}
        underlayColor="white"
      >
        <Ionicons color={iconColor} size={30} name="ios-add-circle-outline" />
      </RectButton>
    </>
  );
};

export default Macros;

const styles = StyleSheet.create({
  addButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
    alignSelf: "flex-end",
  },
  optionsButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
});
