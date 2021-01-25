import { useEffect, useState } from 'react';

export default function assetsForm({ setAssetWindow }) {
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
      <div>
        {data.map((element, index) => (
          <div>
            <input type="checkbox" name={index} id={index} />
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

const substr = 'spiderman';
const url = `https://jsonmock.hackerrank.com/api/movies/search/?Title=${substr}`;
console.log(url);
fetch(url)
  .then((data) => data.json())
  .then((response) => response.data)
  .then((array) => array.map((movie) => console.log(movie.Tilte)));

fetch(url)
  .then((data) => data.json())
  .then((response) => response.data)
  .then((array) => array.map((movie) => console.log(movie.Title)));
