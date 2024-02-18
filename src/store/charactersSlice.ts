import { Person } from '@/api/types.api';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from './store';
import { baseAPI } from '@/api/base.api';

type InitialState = {
  characters: Person[];
};

const initialState: InitialState = {
  characters: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    saveCharacters(state, { payload }) {
      return {
        ...state,
        characters: [...state.characters, ...payload],
      };
    },
    updateCharacters(state, { payload }) {
      return {
        ...state,
        characters: payload,
      };
    },
    addToFavorite(state, { payload }) {
      const addedFavorite = state.characters.map(item => {
        if (item.name === payload) {
          return {
            ...item,
            favorite: !item.favorite,
          };
        }
        return item;
      });

      return {
        ...state,
        characters: addedFavorite,
      };
    },
  },
});

export const { saveCharacters, updateCharacters, addToFavorite } =
  charactersSlice.actions;

export default charactersSlice.reducer;

export const selectCharacters = (state: RootState) =>
  state.characters.characters;
