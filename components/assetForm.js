import styles from '../styles/AssetForm.module.css';
import { useState } from 'react';

export default function assetForm({ setShowModal, setData }) {
  const [assetInfo, setAssetInfo] = useState({});
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/assets', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'applicatrion/json',
        },
        body: JSON.stringify(assetInfo),
      });
      const data = await res.json();
      setData(data.assets);
      setShowModal(false);
    } catch (err) {}
  };

  const handleAssetInfoChange = (e) => {
    setAssetInfo({
      ...assetInfo,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {};

  return (
    <div className={styles.wrapper}>
      <h2>New Asset </h2>
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <label htmlFor='machine_name' className={styles.label}>
            Name:
          </label>
          <input
            className={styles.input}
            name='machine_name'
            onChange={handleAssetInfoChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='type' className={styles.label}>
            Type:
          </label>
          <input
            className={styles.input}
            name='type'
            onChange={handleAssetInfoChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='tag' className={styles.label}>
            Tag:
          </label>
          <input
            className={styles.input}
            name='tag'
            onChange={handleAssetInfoChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='manufacturer' className={styles.label}>
            Manufacturer:
          </label>
          <input
            className={styles.input}
            name='manufacturer'
            onChange={handleAssetInfoChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='serial' className={styles.label}>
            Serial #:
          </label>
          <input
            className={styles.input}
            name='serial'
            onChange={handleAssetInfoChange}
          />
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor='status' className={styles.label}>
            Status:
          </label>
          <input
            className={styles.input}
            name='status'
            onChange={handleAssetInfoChange}
          />
        </div>
        <button className={styles.button}>SAVE</button>
      </form>
    </div>
  );
}
