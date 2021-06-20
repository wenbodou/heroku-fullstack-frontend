import './App.css';
import React, { useState, useEffect } from 'react';

const axios = require('axios');
const rootUrl = process.env.ROOT_URL || "http://localhost:8080"

function App() {

  const [list, setList] = useState([]);

  const callAxiosGet = () => {
    console.log(process.env.ROOT_URL);
    return axios.get(`${rootUrl}/testGet`).then((res) => {
      console.log(res.data)
      return res.data;
    });
  }
  
  const callAxiosPost = () => {
    console.log("hello")
    axios.post(`${rootUrl}/testPost`, {name: 'helloWord'}).then((res) => {
      console.log(res.data)
      return res;
    }).then((res) => {
      return callAxiosGet();
    }).then((res) => {
      console.log(res)
      setList(res)
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    callAxiosGet().then((res) => {
      setList(res);
    });
  },[]);

  return (
    <div className="App">
        <button onClick={callAxiosPost}>post</button>
        <div>{list.map((obj) => <div>{obj.name}</div>)}</div>
    </div>
  );
}

export default App;
