import './App.css';
import React, { useState, useEffect } from 'react';

const axios = require('axios');
const rootUrl = process.env.REACT_APP_ROOT_URL || "http://localhost:8080"

function App() {

  const [list, setList] = useState([]);
  const [input, setInput] = useState('');

  const callAxiosGet = () => {
    console.log("rooturl",rootUrl);
    return axios.get(`${rootUrl}/testGet`,
    {
      headers: {'Access-Control-Allow-Origin': '*'}
    }).then((res) => {
      console.log(res.data)
      return res.data;
    });
  }
  
  const callAxiosPost = () => {
    axios.post(`${rootUrl}/testPost`, {name: input}).then((res) => {
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

  const callAxiosDelete = () => {
    axios.delete(`${rootUrl}/testDelete`, {
      headers: {'Access-Control-Allow-Origin': '*'}
    }).then((res) => {
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
      <div>wenbo!<br /></div>
      Input: <input onChange={(event) => {setInput(event.target.value); console.log('input',event.target.value)}}></input>
      <button onClick={callAxiosPost}>post</button>
      <button onClick={callAxiosDelete}>delete</button>
      <div>{list.map((obj) => <div>{obj.name}</div>)}</div>
    </div>
  );
}

export default App;
