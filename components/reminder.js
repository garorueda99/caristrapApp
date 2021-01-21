import { useTodos } from '../hooks/useTodos';
import styles from '../styles/Reminder.module.css';
export default function reminder() {
  const { todos, isLoading, isError } = useTodos();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.container}>Total todos: {todos.length} </div>
      <div className={styles.container}>Today's todos: {todos.length} </div>
      <div className={styles.container}>Expired todos: {todos.length} </div>
    </div>
  );
}
