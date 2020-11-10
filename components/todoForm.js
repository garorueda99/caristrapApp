import styles from '../styles/TodoForm.module.css';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { GrAddCircle, GrPowerCycle } from 'react-icons/gr';
import { FaRegCalendarAlt } from 'react-icons/fa';
import subDays from 'date-fns/subDays';

import 'react-datepicker/dist/react-datepicker.css';

export default function todoForm({ setShowModal, setData }) {
  const [assetInfo, setAssetInfo] = useState({});
  const [title, setTitle] = useState('New Task Title');
  const [startDate, setStartDate] = useState(new Date());
  const [step, setStep] = useState(null);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);

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
  useEffect(() => {
    setStep(null);
  }, [steps]);
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
        <section className={styles.sectionWrapper}>
          <h2>Steps {steps.length === 0 ? '' : `(${steps.length})`}:</h2>
          <div className={styles.stepBox}>
            <textarea
              rows='5'
              value={step}
              onChange={(e) => {
                setStep(e.target.value);
              }}
            />

            <button
              className={styles.smallButton}
              onClick={() => {
                setSteps([...steps, step]);
              }}
            >
              ADD STEP
            </button>
          </div>
          <div className={styles.stepsContainer}>
            {steps.map((step) => (
              <div className={styles.step}>{step}</div>
            ))}
          </div>
        </section>

        <button className={styles.button}>SAVE</button>
      </form>
    </div>
  );
}
