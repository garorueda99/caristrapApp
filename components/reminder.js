import { useTodos } from '../hooks/useTodos';
export default function reminder() {
  const { todos, isLoading, isError } = useTodos();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  return <pre>{JSON.stringify(todos, null, 2)}</pre>;
}
