import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import './SearchAPI.css'
import axios from 'axios';


const SearchAPI = () => {
    const apiDataFromRedux = useSelector(state => state.apiResults);
    const term = useSelector(state => state.searchTermCollection);
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState('')
    
    const getApiData = (title) => {
        axios.get(`http://hn.algolia.com/api/v1/search?query=${title}&tags=story`)
            .then(res => {
                for (let i = 0; i < res.data.hits.length; i++) {
                    dispatch({
                        type: 'ADD_API_RESULT',
                        payload: {
                            author: res.data.hits[i].author,
                            title: res.data.hits[i].title,
                            url: res.data.hits[i].url
                        }
                    })
                }
            })
            .catch(err => console.error(err))
   }
   
   const handleSubmit = (e) => {
       e.preventDefault();
       dispatch({
        type: 'ADD_SEARCHED_TERM',
        payload: inputData
    })
        setInputData('') 
        getApiData(inputData)
   }

console.log(term)
   const data = apiDataFromRedux.length !== 0 ? apiDataFromRedux.map((key, index) => {
       return (
            <div key={index} className='cards'>
                <ul>
                    <li>Author: {key.author}</li>
                    <hr/>
                    <li>Title: {key.title}</li>
                    <hr/>
                    <li>Source: <span><a href={key.url} target="_blank" rel="noreferrer">Read Story Here!</a></span></li>
                </ul>
            </div>
       )
   }): getApiData()

    return (
        <div>
            {/* remove this button */}
            <button onClick={() => getApiData()}>get data</button>


            <h1>Hacker News Algolia API!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                name='title' 
                type='text'
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder='Title...'
                />
                <button type='submit'>Search</button>
            </form>
            {data}
        </div>
    )
}

export default SearchAPI;