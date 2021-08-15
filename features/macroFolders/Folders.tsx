import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'

import SwipeableList, { IconAction, iconActionRender } from '../../components/SwipeableList'
import { Text, useThemeColor, View } from '../../components/Themed'
import { deleteFolder, globalSelectors as folderSelectors, MacroFolder } from './folderSetup'

interface FoldersProps {
  openFolder: (folderId: string, folderName: string) => void;
  openAddFolder: () => void;
  openEditFolder: (id: string) => void;
}

const Folders = (props: FoldersProps) => {
  const dispatch = useDispatch();
  const folders = useSelector(folderSelectors.selectAll);
  const iconColor = useThemeColor({}, "icon");
  const onOpen = (id: string, name: string) => props.openFolder(id, name);

  const renderItem = (folder: MacroFolder) => (
    <View style={{ paddingRight: 10, paddingLeft: 10 }}>
      <RectButton
        style={{
          display: "flex",
          flexDirection: "row",
          flex: 1,
          alignItems: "center",
          height: 50,
        }}
        onPress={() => onOpen(folder.id, folder.name)}
      >
        <Ionicons
          style={{ marginRight: 10 }}
          color={iconColor}
          size={20}
          name="ios-folder"
        />
        <Text style={{ flex: 1 }}>{folder.name}</Text>
        <Text>{folder.macroIds.length}</Text>
      </RectButton>
    </View>
  );

  const rightActions: IconAction<MacroFolder>[] = [
    {
      iconName: "ios-options",
      color: "#2980B9",
      onPress: (folder) => props.openEditFolder(folder.id),
    },
    {
      iconName: "ios-trash",
      color: "#E74C3C",
      onPress: (folder) => dispatch(deleteFolder(folder)),
      filter: (folder) => folder.id != "all-macros",
    },
  ];

  return (
    <>
      <SwipeableList
        style={{ width: "100%" }}
        data={folders}
        renderItem={renderItem}
        renderRightActions={iconActionRender(rightActions)}
      />
      <RectButton
        style={styles.addButton}
        onPress={props.openAddFolder}
        underlayColor="white"
      >
        <Ionicons color={iconColor} size={30} name="ios-add-circle-outline" />
      </RectButton>
    </>
  );
};

export default Folders;

const styles = StyleSheet.create({
  addButton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    padding: 10,
    alignSelf: "flex-end",
  },
});
