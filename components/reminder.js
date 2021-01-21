import { useTodos } from '../hooks/useTodos';
import styles from '../styles/Reminder.module.css';
export default function reminder() {
  const { todos, isLoading, isError } = useTodos();

  if (isError) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;
  const CURRENT_DATE = new Date();
  const TODAY_DATE = CURRENT_DATE.getDate();
  const TODAY_MONTH = CURRENT_DATE.getMonth();
  const TODAY_YEAR = CURRENT_DATE.getFullYear();
  const EXPIRED_LIST = [];
  const FUTURE_LIST = [];
  const TODAY_LIST = [];

  todos.filter((todo) => {
    const TASK_DATE = new Date(todo.startDate);
    const TODO_DATE = TASK_DATE.getDate();
    const TODO_MONTH = TASK_DATE.getMonth();
    const TODO_YEAR = TASK_DATE.getFullYear();
    if (
      TODAY_DATE === TODO_DATE &&
      TODAY_MONTH === TODO_MONTH &&
      TODAY_YEAR === TODO_YEAR
    ) {
      TODAY_LIST.push(todo);
    } else {
      TASK_DATE > CURRENT_DATE
        ? FUTURE_LIST.push(todo)
        : EXPIRED_LIST.push(todo);
    }
  });
  return (
    <div className={styles.headerWrapper}>
      <div className={styles.container}>Total todos: {todos.length} </div>
      <div className={styles.container}>
        Today's todos: {TODAY_LIST.length}{' '}
      </div>
      <div className={styles.container}>
        Future todos: {FUTURE_LIST.length}{' '}
      </div>
      <div className={styles.container}>
        Expired todos: {EXPIRED_LIST.length}{' '}
      </div>
    </div>
  );
}
