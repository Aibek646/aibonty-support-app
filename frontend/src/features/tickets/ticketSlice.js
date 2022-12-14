import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { extractErrorMessage } from "../../utils";
import ticketService from "./ticketService";

const initialState = {
    tickets: null,
    ticket: null
    // isError: false,
    // isSuccess: false,
    // isLoading: false,
    // message: ""
};

//Create new ticket
export const createTicket = createAsyncThunk(
    "tickets/create",
    async (ticketData, thunkAPI) => {
        try {
            // console.log(ticketData);
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.createTicket(ticketData, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

//Get user tickets
export const getTickets = createAsyncThunk(
    "tickets/getAll",
    async (_, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTickets(token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    }
);

export const getTicket = createAsyncThunk(
    "ticket/get",
    async (ticketId, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await ticketService.getTicket(ticketId, token);
        } catch (error) {
            return thunkAPI.rejectWithValue(extractErrorMessage(error));
        }
    }
);

export const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder
            // .addCase(createTicket.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(createTicket.fulfilled, (state) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            // })
            // .addCase(createTicket.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = action.payload;
            // })
            // .addCase(getTickets.pending, (state) => {
            //     state.isLoading = true;
            // })
            // .addCase(getTickets.fulfilled, (state, action) => {
            //     state.isLoading = false;
            //     state.isSuccess = true;
            //     state.tickets = action.payload;
            // })
            // .addCase(getTickets.rejected, (state, action) => {
            //     state.isLoading = false;
            //     state.isError = true;
            //     state.message = action.payload;
            // });
            .addCase(getTickets.pending, (state) => {
                state.ticket = null;
            })
            .addCase(getTickets.fulfilled, (state, action) => {
                state.tickets = action.payload;
            })
            .addCase(getTicket.fulfilled, (state, action) => {
                state.ticket = action.payload;
            });
    }
});

export const { reset } = ticketSlice.actions;
export default ticketSlice.reducer;
