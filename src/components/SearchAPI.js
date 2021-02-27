import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import './SearchAPI.css'
import axios from 'axios';


const SearchAPI = () => {
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState('')
    const [apiArr, setApiArr] = useState([])

// get data
const getApiData = async title => {
    try {
        const response = await axios.get(`http://hn.algolia.com/api/v1/search?query=${title}&tags=story`)
        const result = await response.data.hits
        setApiArr(result.slice(0, 10))
    }
    catch (error) {console.log(error)}
}
   
   const handleSubmit = e => {
       e.preventDefault();
       dispatch({
        type: 'ADD_SEARCHED_TERM',
        payload: inputData
    })
        setInputData('') 
        getApiData(inputData)
   }

    // render data to the page
   const data = apiArr.length ? apiArr.map((key, index) => {
       return (
            <div key={index} className='cards'>
                <ul className='list-container'>
                    <li>Author: {key.author}</li>
                    <hr/>
                    <li>Title: {key.title}</li>
                    <hr/>
                    <li>Source: <span><a href={key.url} target="_blank" rel="noreferrer">Read Story Here!</a></span></li>
                </ul>
            </div>
       )
   }): (
       <div>
           <p className='message-before-data'>No data yet!</p>
       </div>
   )
    return (
        <div>
            <h1 className='title'>Search Hacker News Algolia API!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                name='title' 
                type='text'
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder='Title...'
                required
                className='input-field'
                />
                <button type='submit' className='btn'>Search</button>
            </form>
            {data}
        </div>
    )
}

export default SearchAPI;