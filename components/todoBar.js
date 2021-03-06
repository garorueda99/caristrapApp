import { useState, useContext } from 'react';
import styles from '../styles/AssetsBar.module.css';
import Modal from './modal';
import TodoForm from './todoForm';
import { formatList } from '../lib/utils';
import { UserContext } from './store';

export default function todoBar({
  selectedRows,
  setSelectedRows,
  setData,
  setView,
  view,
}) {
  const [user] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [todoPointer, setTodoPointer] = useState(null);
  return (
    <div className={styles.wrapper}>
      <fieldset
        className={styles.radio}
        onChange={(e) => {
          setView(e.target.value);
        }}
      >
        <label htmlFor="table" className={styles.label}>
          <input
            type="radio"
            id="table"
            value="table"
            name="view"
            defaultChecked
          />
          Table
        </label>
        <label htmlFor="cards" className={styles.label}>
          <input type="radio" id="cards" value="cards" name="view" />
          Cards
        </label>
      </fieldset>
      <div>
        <button
          className={styles.button}
          onClick={() => {
            setShowModal(true);
          }}
        >
          ADD NEW
        </button>
        {user.profile === 'admin' && (
          <button
            className={styles.button}
            onClick={async () => {
              if (selectedRows._id) {
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
                  setData(formatList(data));
                } catch (err) {}
              }
            }}
          >
            DELETE
          </button>
        )}
        {user.profile === 'admin' && (
          <button className={styles.button}>RESOLVE</button>
        )}
        <button className={styles.button}>EXPORT</button>
      </div>
      {showModal && (
        <Modal setShowModal={setShowModal} setData={setTodoPointer}>
          <TodoForm setShowModal={setShowModal} setData={setData} view={view} />
        </Modal>
      )}
    </div>
  );
}
