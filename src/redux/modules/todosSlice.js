import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { waitTwoSeconds } from "../../utils";

export const __addToDo = createAsyncThunk("__addToDo", async (payload, thunkAPI) => {
  waitTwoSeconds().then(() => {
    thunkAPI.dispatch(addTodo(payload));
  });
});

export const __deleteTodo = createAsyncThunk("__deleteToDo", async (payload, thunkAPI) => {
  console.log(payload);
  waitTwoSeconds().then(() => {
    thunkAPI.dispatch(deleteTodo(payload));
  });
});

const initialState = {
  todos: [
    {
      id: 1,
      title: "hello world!",
      body: "HELLO WORLD!",
    },
    {
      id: 2,
      title: "hello react!",
      body: "HELLO REACT!",
    },
  ],
  isLoading: false,
  isError: false,
  error: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((item) => item.id !== action.payload);
    },
  },
});

export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
