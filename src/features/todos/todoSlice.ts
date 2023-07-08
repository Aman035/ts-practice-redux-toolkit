import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../../app/store'
import { Todo, TodoState } from './model'

const initialState: TodoState = {
  loading: false,
  todos: [],
  error: undefined,
}

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (): Promise<Todo[]> => {
    const data = (await axios.get('https://jsonplaceholder.typicode.com/todos'))
      .data
    return data
  }
)

export const todoSlice = createSlice({
  name: 'todos',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.loading = true
    })
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<Todo[]>) => {
        state.loading = false
        state.todos = action.payload
      }
    )
    builder.addCase(fetchTodos.rejected, (state, action) => {
      state.loading = false
      state.todos = []
      state.error = action.error.message
    })
  },
  reducers: {
    deleteTodo: (state, action: PayloadAction<{ id: number }>) => {
      state.todos = state.todos.filter(
        (todo: Todo) => todo.id !== action.payload.id
      )
    },
  },
})

// export actions
export const { deleteTodo } = todoSlice.actions
export const todoSelector = (state: RootState) => state.todoReducer
export default todoSlice.reducer
