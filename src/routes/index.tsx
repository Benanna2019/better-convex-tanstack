import { TodoList } from '@/components/todos/todo-list';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ 
  component: Home, 
}) 

function Home() { 
  return (
    <div className="container mx-auto px-4 py-6">
      <TodoList />
    </div>
  );
}
