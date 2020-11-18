import styles from '../styles/TodoForm.module.css';
import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { GrPowerCycle } from 'react-icons/gr';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import subDays from 'date-fns/subDays';
import 'react-datepicker/dist/react-datepicker.css';
import AssetsList from '../components/assetsList';
import { formatList } from '../lib/utils';

export default function todoForm({
  setShowModal,
  setData,
  todoPointer,
  setTodoPointer,
  view,
}) {
  const [task, setTask] = useState({ startDate: new Date() });
  const [step, setStep] = useState('');
  const [stepIndex, setStepIndex] = useState(-1);
  const [assetWindow, setAssetWindow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(task).length > 3) {
      if (view === 'table') {
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
          setData(formatList(data));
          setShowModal(false);
        } catch (err) {
          console.log('ERROR:', err);
        }
      } else if (view === 'cards') {
        if (todoPointer) {
          try {
            const res = await fetch('/api/todos/cards', {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'applicatrion/json',
              },
              body: JSON.stringify({ ...task }),
            });
            const data = await res.json();
            console.log('====>', data);
            setData(data);
            setShowModal(false);
          } catch (err) {
            console.log('ERROR:', err);
          }
        } else {
          try {
            const res = await fetch('/api/todos/cards', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'applicatrion/json',
              },
              body: JSON.stringify({ ...task }),
            });
            const data = await res.json();
            setData(data);
            setShowModal(false);
          } catch (err) {
            console.log('ERROR:', err);
          }
        }
      }
    }
  };

  const handleTaskInfoChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (todoPointer) {
      // setStartDate(todoPointer.startDate);
      setTask({ ...todoPointer, startDate: new Date(todoPointer.startDate) });
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      {assetWindow ? (
        <AssetsList
          setAssetWindow={setAssetWindow}
          task={task}
          setTask={setTask}
        />
      ) : (
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          {/* {JSON.stringify(task)} */}
          {/* <div>{JSON.stringify(step)}</div> */}
          <input
            className={styles.title}
            name='title'
            value={task.title || ''}
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
                selected={task.startDate}
                onChange={(date) => {
                  setTask({ ...task, startDate: date });
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
            <h2>Steps {task.steps && task.steps.length}:</h2>
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
                      const newArray = [...task.steps];
                      newArray.splice(stepIndex, 1, step);
                      setTask({ ...task, steps: [...newArray] });
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
                    // console.log(step, step.length);
                    if (step.length > 0) {
                      task.steps
                        ? setTask({ ...task, steps: [...task.steps, step] })
                        : setTask({ ...task, steps: [step] });
                      setStep('');
                    }
                  }}
                >
                  ADD
                </button>
              )}
            </div>
            <div className={styles.stepsContainer}>
              {task.steps &&
                task.steps.map((element, index) => (
                  <div
                    data-key={index}
                    className={styles.stepBox}
                    key={`step-${index}`}
                  >
                    <button
                      type='button'
                      className={styles.step}
                      onClick={(e) => {
                        setStep(task.steps[index]);
                        setStepIndex(index);
                      }}
                    >
                      <div data-key={index} className={styles.textStep}>
                        Step {index + 1}:{element.slice(0, 20).trim()}...
                      </div>
                    </button>
                    <button
                      className={styles.deleteBtn}
                      type='button'
                      onClick={(e) => {
                        const newArray = [...task.steps];
                        newArray.splice(index, 1);
                        setTask({ ...task, steps: [...newArray] });
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
                // steps,
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
