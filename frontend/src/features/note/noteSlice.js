import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils";
import noteService from "./noteService";

const initialState = {
    notes: null
};

//Get ticket notes
export const getNotes = createAsyncThunk(
    "notes/getAll",
    async (ticketData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.getNotes(ticketData, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
);

//Create ticket note
export const createNote = createAsyncThunk(
    "notes/create",
    async ({ noteText, ticketId }, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await noteService.createNote(noteText, ticketId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);

export const noteSlice = createSlice({
    name: "note",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.notes = null;
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.notes = action.payload;
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.notes.push(action.payload);
            });
    }
});

export default noteSlice.reducer;
