import useSWR from 'swr';
import { todoFetcher } from '../lib/fetchers';

export default function reminder() {
  const { data, error } = useSWR('/api/todos', todoFetcher);
  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
