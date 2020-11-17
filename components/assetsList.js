import { useEffect, useState } from 'react';

export default function assetsList({
  setAssetWindow,
  title,
  assetsList,
  setAssetsList,
}) {
  const [data, setData] = useState([]);
  const [initialState, setInitialState] = useState({});

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
      <h2>Select Assest for {title}</h2>
      <div>
        {data.map((element, index) => (
          <div key={`asset-${index}`}>
            <input
              type='checkbox'
              name={element._id}
              id={element._id}
              checked={element._id in assetsList}
              onChange={(e) => {
                if (e.target.checked) {
                  setAssetsList({ ...assetsList, [e.target.name]: false });
                } else {
                  delete assetsList[e.target.name];
                  setAssetsList({ ...assetsList });
                }
              }}
            />
            <label htmlFor={element._id}>
              {element.machine_name}-{element.tag}
            </label>
          </div>
        ))}
      </div>
      <button onClick={() => setAssetWindow(false)}>CLOSE</button>
    </div>
  );
}
