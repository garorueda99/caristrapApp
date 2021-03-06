import React, { useEffect, useState } from 'react';
import styles from '../styles/Card.module.css';
import { BiTask, BiAlarmOff, BiEdit, BiTrash } from 'react-icons/bi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function Card({ data, setShowModal, setTodoPointer, setData }) {
  const deleteTask = async (taskId) => {
    try {
      const res = await fetch('/api/todos/cards', {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'applicatrion/json',
        },
        body: JSON.stringify(taskId),
      });
      const data1 = await res.json();
      setData([...data1]);
    } catch (err) {
      console.log('ERROR:', err);
    }
  };

  return (
    <div className={styles.mainWrapper}>
      <button>
        <div className={styles.title}>
          <BiTask className={styles.titleIcon} size="25" />
          <h3>{data.title}</h3>
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.info}>
            <h3>Due date:</h3>
            {new Intl.DateTimeFormat('en-US').format(new Date(data.startDate))}
            {new Date(data.startDate) < new Date() ? (
              <div>Expired</div>
            ) : (
              <span>In course</span>
            )}
          </div>
          <div className={styles.info}>
            <h3>Frequency</h3>
            {data.frequency || 'none'}
          </div>
          <div className={styles.info}>
            <h3>Assignments:</h3>
            {data.assets && Object.keys(data.assets).length}
          </div>
        </div>
      </button>
      <div className={styles.menu}>
        <button>
          <AiOutlineCheckCircle color="white" size="25" />
        </button>
        <button
          onClick={() => {
            setTodoPointer(data);
            setShowModal(true);
          }}
        >
          <BiEdit color="white" size="25" />
        </button>
        <button>
          <BiAlarmOff color="white" size="25" />
        </button>
        <button
          onClick={() => {
            deleteTask(data._id);
          }}
        >
          <BiTrash color="white" size="25" />
        </button>
      </div>
    </div>
  );
}
