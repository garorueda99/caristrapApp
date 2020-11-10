import styles from '../styles/TodoForm.module.css';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { GrAddCircle, GrPowerCycle } from 'react-icons/gr';
import { FaRegCalendarAlt } from 'react-icons/fa';
import subDays from 'date-fns/subDays';

import 'react-datepicker/dist/react-datepicker.css';

export default function todoForm({ setShowModal, setData }) {
  const [assetInfo, setAssetInfo] = useState({});
  const [title, setTitle] = useState('New Task Title');
  const [startDate, setStartDate] = useState(new Date());
  const [steps, setSteps] = useState([]);
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
      <form className={styles.formWrapper} onSubmit={handleSubmit}>
        <input
          className={styles.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <section className={styles.sectionWrapper}>
          <div className={styles.inputContainer}>
            <label htmlFor='due_date' className={styles.label}>
              <FaRegCalendarAlt size='35' />
              Start
            </label>
            <DatePicker
              name='due_date'
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              minDate={subDays(new Date(), 0)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputContainer}>
            <label
              className={styles.label}
              htmlFor='frequency'
              className={styles.label}
            >
              <GrPowerCycle size='35' />
              <span>Frequency</span>
            </label>
            <select className={styles.input} name='frequency'>
              <option value='daily'>Daily</option>
              <option value='weekly'>Weekly</option>
              <option value='monthly'>Monthly</option>
              <option value='biMonthly'>Bi-Monthly</option>
              <option value='quarterly'>Quarterly</option>
              <option value='semiAnnual'>Semi Annual</option>
              <option value='Annual'>Annual</option>
            </select>
          </div>
        </section>
        <div className={styles.inputContainer}>
          <button className={styles.button}>
            <GrAddCircle size='35' />
          </button>
          <h2>Steps {steps.length === 0 ? '' : `(${steps.length})`}</h2>
        </div>
        <div className={styles.stepsContainer}>
          <div className={styles.step}>Step1...</div>
        </div>
        <button className={styles.button}>SAVE</button>
      </form>
    </div>
  );
}
