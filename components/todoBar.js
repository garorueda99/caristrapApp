import { useState } from 'react';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import TodoForm from './todoForm';
import { formattedList } from '../lib/utils';

export default function todoBar({ selectedRows, setSelectedRows, setData }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <div className={styles.wrapper}>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            setShowModal(true);
          }}
        >
          ADD NEW
        </button>
        <button
          className={styles.button}
          onClick={async () => {
            if (selectedRows.length > 0) {
              try {
                const res = await fetch('/api/todos', {
                  method: 'DELETE',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'applicatrion/json',
                  },
                  body: JSON.stringify({ _ids: selectedRows }),
                });
                setSelectedRows([]);
                const data = await res.json();
                setData(formattedList(data));
              } catch (err) {}
            }
          }}
        >
          DELETE
        </button>
        <button className={styles.button}>SAVE</button>
        <button className={styles.button}>EXPORT</button>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal}>
          <TodoForm setShowModal={setShowModal} setData={setData} />
        </Modal>
      )}
    </div>
  );
}
