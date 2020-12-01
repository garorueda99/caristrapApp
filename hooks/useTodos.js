import useSWR from 'swr';
import { fetcher } from '../lib/fetchers';

export function useTodos() {
  const { data, error } = useSWR('/api/todos', fetcher);
  return {
    todos: data,
    isLoading: !error && !data,
    isError: error,
  };
}
