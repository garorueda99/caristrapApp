import React, { useEffect, useState } from 'react';
import Card from './card';
import styles from '../styles/Cards.module.css';
import Modal from './modal';
import TodoForm from './todoForm';

export default function Cards() {
  const [data, setData] = useState([]);
  const [todoPointer, setTodoPointer] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      (async () => {
        const res = await fetch('/api/todos/cards');
        const data = await res.json();
        setData(data);
      })();
    } catch (err) {
      console.log('ERROR:', err);
    }
  }, []);
  return (
    <div className={styles.mainWrapper}>
      {data.map((todo, index) => (
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
          />
        </Modal>
      )}
    </div>
  );
}
