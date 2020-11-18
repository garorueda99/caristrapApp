import React, { useEffect, useState } from 'react';
import Card from './card';
import styles from '../styles/Cards.module.css';
import Modal from './modal';
import TodoForm from './todoForm';

export default function Cards({ view, data, setData }) {
  const [todoPointer, setTodoPointer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    try {
      (async () => {
        const res = await fetch('/api/todos/cards');
        const data = await res.json();
        setData(data);
        setLoaded(true);
      })();
    } catch (err) {
      console.log('ERROR:', err);
    }
  }, []);
  return (
    <div className={styles.mainWrapper}>
      {loaded &&
        data.map((todo, index) => (
          <Card
            key={index}
            data={todo}
            setShowModal={setShowModal}
            setData={setTodoPointer}
          />
        ))}
      {showModal && (
        <Modal setShowModal={setShowModal} setData={setTodoPointer}>
          <TodoForm
            setShowModal={setShowModal}
            setData={setData}
            setTodoPointer={setTodoPointer}
            todoPointer={todoPointer}
            view={view}
          />
        </Modal>
      )}
    </div>
  );
}
