export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodoState {
  loading: boolean
  todos: Todo[]
  error: string | undefined
}
