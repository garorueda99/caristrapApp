import styles from '../styles/TodoForm.module.css';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { GrPowerCycle } from 'react-icons/gr';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import subDays from 'date-fns/subDays';
import 'react-datepicker/dist/react-datepicker.css';
import AssetsList from '../components/assetsList';
import { formattedList } from '../lib/utils';

export default function todoForm({ setShowModal, setData, todoPointer }) {
  const [task, setTask] = useState(null);
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [step, setStep] = useState('');
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(-1);
  const [assetWindow, setAssetWindow] = useState(false);
  const [assetsList, setAssetsList] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      try {
        const res = await fetch('/api/todos', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'applicatrion/json',
          },
          body: JSON.stringify({ ...task }),
        });
        const data = await res.json();
        setData(formattedList(data));
        setShowModal(false);
      } catch (err) {}
    }
  };

  const handleTaskInfoChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
    switch (e.target.name) {
      case 'title':
        setTitle(e.target.value);
        break;
    }
  };

  const validate = () => {};

  useEffect(() => {
    if (todoPointer) {
      console.log(todoPointer);
      setTitle(todoPointer.title);
      // setStartDate(todoPointer.startDate);
      setSteps(todoPointer.steps);
      setAssetsList(todoPointer.assets);
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {assetWindow ? (
        <AssetsList
          setAssetWindow={setAssetWindow}
          title={title}
          assetsList={assetsList}
          setAssetsList={setAssetsList}
        />
      ) : (
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <input
            className={styles.title}
            name='title'
            value={title}
            placeholder='New Task Title'
            onChange={handleTaskInfoChange}
            required
          />
          <section className={styles.sectionWrapper}>
            <button
              type='button'
              onClick={() => {
                setAssetWindow(true);
              }}
            >
              ASSETS
            </button>
            <div className={styles.inputContainer}>
              <label htmlFor='due_date' className={styles.label}>
                <FaRegCalendarAlt size='35' />
                Start
              </label>
              <DatePicker
                name='due_date'
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                  setTask({ ...task, startDate });
                }}
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
              <select
                className={styles.input}
                name='frequency'
                onChange={handleTaskInfoChange}
              >
                <option value='none'>None</option>
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
              {stepIndex >= 0 ? (
                <button
                  type='button'
                  className={styles.smallButton}
                  onClick={() => {
                    if (step.length > 0) {
                      const newArray = steps;
                      newArray.splice(stepIndex, 1, step);
                      setSteps([...newArray]);
                      setStep('');
                      setStepIndex(-1);
                    }
                  }}
                >
                  MODIFY
                </button>
              ) : (
                <button
                  type='button'
                  className={styles.smallButton}
                  onClick={() => {
                    if (step.length > 0) {
                      setSteps([...steps, step]);
                      setStep('');
                    }
                  }}
                >
                  ADD
                </button>
              )}
            </div>
            <div className={styles.stepsContainer}>
              {steps.map((step, index) => (
                <div data-key={index} className={styles.stepBox}>
                  <button
                    type='button'
                    className={styles.step}
                    onClick={(e) => {
                      setStep(steps[index]);
                      setStepIndex(index);
                    }}
                  >
                    <div data-key={index} className={styles.textStep}>
                      Step {index + 1}: {step.slice(0, 20).trim()}...
                    </div>
                  </button>
                  <button
                    className={styles.deleteBtn}
                    type='button'
                    onClick={(e) => {
                      const newArray = steps;
                      newArray.splice(index, 1);
                      setSteps([...newArray]);
                      setStepIndex(-1);
                    }}
                  >
                    <AiOutlineDelete size='25' />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <button
            className={styles.button}
            onSubmit={() => {
              setTask({
                ...task,
                startDate,
                steps,
                status: open,
                assets: assetsList,
              });
            }}
          >
            SAVE
          </button>
        </form>
      )}
    </div>
  );
}
