import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Folder } from '../../../../content/folders/foldersList/types';

interface FolderState {
  folders: Folder[];
}

const initialState: FolderState = {
  folders: [],
};

const folderSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    addFolders: (state, action: PayloadAction<Folder[]>) => {
      action.payload.forEach(folder => {
        if (!state.folders.some(existingFolder => existingFolder.name === folder.name)) {
          state.folders.push(folder);
        }
      });
    },
    updateFolder: (state, action: PayloadAction<{ index: number; newName: string }>) => {
      const { index, newName } = action.payload;
      if (index >= 0 && index < state.folders.length) {
        state.folders[index].name = newName;
      }
    },
    deleteFolder: (state, action: PayloadAction<number>) => {
      const indexToDelete = action.payload;
      if (indexToDelete >= 0 && indexToDelete < state.folders.length) {
        state.folders.splice(indexToDelete, 1);
      }
    },
  },
});

export const { addFolders, updateFolder, deleteFolder } = folderSlice.actions;
export default folderSlice.reducer;
