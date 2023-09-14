import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const __addToDo = createAsyncThunk("__addToDo", async (payload, thunkAPI) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, payload);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteTodo = createAsyncThunk("__deleteToDo", async (payload, thunkAPI) => {
  try {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${payload}`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    console.log("error", error);
    return thunkAPI.rejectWithValue(error);
  }
});

export const __getToDo = createAsyncThunk("__getToDo", async (payload, thunkAPI) => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
    console.log("response", response.data);
    return thunkAPI.fulfillWithValue(response.data);
  } catch (error) {
    console.log("error", error);
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  todos: [],
  isLoading: false,
  isError: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(__getToDo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__getToDo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.todos = action.payload;
      })
      .addCase(__addToDo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__addToDo.fulfilled, (state, action) => {
        state.isLoading = false;
        state.todos.push(action.payload);
      })
      .addCase(__deleteTodo.pending, (state, action) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(__deleteTodo.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.todos = state.todos.filter((item) => item.id !== action.payload);
      });
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
