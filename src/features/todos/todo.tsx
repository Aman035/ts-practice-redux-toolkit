import { useEffect, useState } from 'react'
import { Todo, TodoState } from './model'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteTodo, fetchTodos, todoSelector } from './todoSlice'

const TodoList = (): JSX.Element => {
  const selectedTodos = useAppSelector(todoSelector)
  const [todoState, setTodoState] = useState<TodoState>(selectedTodos)
  const dispatch = useAppDispatch()

  useEffect(() => {
    setTodoState(selectedTodos)
  }, [selectedTodos])

  const renderList = (): JSX.Element[] => {
    return todoState.todos.map((todo: Todo) => {
      return (
        <div
          onClick={() => dispatch(deleteTodo({ id: todo.id }))}
          key={todo.id}
        >
          {todo.title}
        </div>
      )
    })
  }

  return (
    <div>
      <button onClick={() => dispatch(fetchTodos())}>Fetch</button>
      {todoState.loading ? 'LOADING' : null}
      {todoState.error ? todoState.error : null}
      {renderList()}
    </div>
  )
}
export default TodoList
