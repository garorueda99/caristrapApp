import styles from '../styles/AssetForm.module.css';
import { AiOutlineWarning } from 'react-icons/ai';

export default function assetDeleteConfirmation({
  setShowModal,
  selectedRows,
  setSelectedRows,
  setData,
}) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <AiOutlineWarning size='35' /> <h2>Warning</h2>{' '}
      </div>
      <div className={styles.textWrapper}>
        Are you sure? This could remove assets that were already assigned to a
        task.
      </div>
      <button
        className={styles.button}
        onClick={async () => {
          if (selectedRows.length) {
            const res = await fetch('/api/assets', {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'applicatrion/json',
              },
              body: JSON.stringify({ _ids: selectedRows }),
            });
            setSelectedRows([]);
            const data = await res.json();
            setData(data.assets);
          }
          setShowModal(false);
        }}
      >
        REMOVE
      </button>
      <button
        className={styles.button}
        onClick={() => {
          setShowModal(false);
          setSelectedRows([]);
          //TODO: Remove checks from table
        }}
      >
        CANCEL
      </button>
    </div>
  );
}
