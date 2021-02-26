import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';


const SearchAPI = () => {
    const stateData = useSelector(state => state.searchTermCollection);
    const dispatch = useDispatch();
    const [inputData, setInputData] = useState('')
    const [apiArr, setApiArr] = useState([])
    /*
    find out why when submitting the form 
    the empty array is populating first rather than the data pushed
    to state.
    */

    const getApiData = (title) => {
        axios.get(`http://hn.algolia.com/api/v1/search?query=${title}&tags=story`)
            .then(res => {
               const keys = Object.values(res.data.hits)
               for (const key of keys) {
                    apiObj = {
                        author: key.author,
                        title: key.title,
                        url: key.url,
                    }  
               }
               setApiArr([apiObj])  
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

   console.log(stateData)

   const data = apiArr.length !== 0 ? apiArr.map((key) => {
       console.log(key)
       return (
           <div key={key}>
               <h2>{key.title}</h2>
           </div>
       )
   }): console.log('no data')

    return (
        <div>
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