import { useEffect, useState } from 'react';

export default function assetsList({ setAssetWindow, title, setTask, task }) {
  const [data, setData] = useState([]);
  const [initialState, setInitialState] = useState({});

  useEffect(async () => {
    setInitialState(task);
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
      <h2>Select Assest for {title}</h2>
      <div>
        {data.map((element, index) => (
          <div>
            <input
              type='checkbox'
              name={index}
              id={index}
              onChange={(e) => {
                if (e.target.checked) {
                  if (task.assets) {
                    setTask({
                      ...task,
                      ['assets']: [
                        ...task['assets'],
                        { [data[index]['_id']]: false },
                      ],
                    });
                  } else {
                    setTask({
                      ...task,
                      ['assets']: [{ [data[index]['_id']]: false }],
                    });
                  }
                } else {
                  if (task['assets'].length === 1) {
                    setTask(initialState);
                  } else {
                    setTask({
                      ...task,
                      ['assets']: task['assets'].filter(
                        (element) => element !== data[index]['_id']
                      ),
                    });
                  }
                }
              }}
            />
            <label htmlFor={index}>
              {element.machine_name}-{element.tag}
            </label>
          </div>
        ))}
      </div>
      <button onClick={() => setAssetWindow(false)}>CLOSE</button>
    </div>
  );
}
