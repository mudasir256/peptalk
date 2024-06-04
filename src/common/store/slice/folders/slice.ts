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
  },
});

export const { } = folderSlice.actions;
export default folderSlice.reducer;
