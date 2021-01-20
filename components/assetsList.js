import { useEffect, useState } from 'react';
import styles from '../styles/TodoForm.module.css';

export default function assetsList({ setAssetWindow, task, setTask }) {
  const removeAssetsKey = () => {
    const newTask = { ...task };
    delete newTask.assets;
    setTask({ ...newTask });
  };
  const [data, setData] = useState([]);
  useEffect(async () => {
    try {
      const res = await fetch('/api/assets/name');
      const data = await res.json();
      setData(data.assets);
    } catch (err) {
      console.log('ERROR:', err);
    }
  }, []);

  return (
    <div>
      <h2>Select Assest for {task.title || 'New Task'}</h2>
      <div className={styles.assetsList}>
        {data.map((element, index) => (
          <div key={`asset-${index}`}>
            <input
              type="checkbox"
              name={element._id}
              id={element._id}
              checked={task.assets ? element._id in task.assets : false}
              onChange={(e) => {
                if (e.target.checked) {
                  task.assets
                    ? setTask({
                        ...task,
                        assets: { ...task.assets, [e.target.name]: false },
                      })
                    : setTask({
                        ...task,
                        assets: { [e.target.name]: false },
                      });
                } else {
                  const newAssetsList = { ...task.assets };
                  delete newAssetsList[e.target.name];
                  Object.keys(newAssetsList).length > 0
                    ? setTask({ ...task, assets: { ...newAssetsList } })
                    : removeAssetsKey();
                }
              }}
            />
            <label htmlFor={element._id}>
              {element.machine_name}-{element.tag}
            </label>
          </div>
        ))}
      </div>
      <button onClick={() => setAssetWindow(false)} className={styles.button}>
        CLOSE
      </button>
    </div>
  );
}
