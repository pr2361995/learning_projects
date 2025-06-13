import { TodoProvider } from './Context'
import React from 'react'
import TodoAdd from './TodoAdd'
import Filter from './Filter'
import TodoList from './TodoList'
import {ErrorBoundary} from 'react-error-boundary';

function Index() {
  return (
    <ErrorBoundary fallbackRender={({error}) => <div>Error: {error.message}</div>}>
        <TodoProvider >
        <TodoAdd filter={<Filter />} todoList={<TodoList />} />
        </TodoProvider>
    </ErrorBoundary>
  )
}

export default Index