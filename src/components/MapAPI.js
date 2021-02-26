import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';


const MapAPI = () => {
    const stateData = useSelector(state => state.searchTermCollection);
    const author = useSelector(state => state.author);
    const title = useSelector(state => state.title);
    const url = useSelector(state => state.url);
    const comments = useSelector(state => state.comments);
    const dispatch = useDispatch();
    const inputData = {
        author: '',
        title: '',
        url: '',
        comments: ''
    }
    const [input, setInput] = useState(inputData)
    /*
    create local state for the response data in an array to render on the page
    place the data from the form in an object inside the
    handleSubmit then place that object
    */

   const handleChange = (e) => {
    const {name, value} = e.target;
    setInput( prevState => ({
        ...prevState,
        [name]: value,
    }))
}
    
    const getApiData = () => {
        axios.get(`http://hn.algolia.com/api/v1/search?query=bar&tags=comment`)
            .then(res => console.log(res.data))
            .catch(err => console.error(err))
   }
   

   const handleSubmit = (e) => {
       e.preventDefault();
       dispatch({
        type: 'ADD_SEARCHED_TERM',
         payload: {
             author: author,
             title: title,
             url: url,
             comments: comments,
         } 
    })
    getApiData()
   }
 
    console.log(stateData);
   /*
   
   
   
   */

    return (
        <div>
            
            <button onClick={() => getApiData()}>get data</button>
            <h1>Form</h1>
            <form onSubmit={handleSubmit}>
                <input 
                name='author' 
                type='text'
                value={author}
                onChange={handleChange}
                placeholder='Auther...'
                />

                <input 
                name='title' 
                type='text'
                value={title}
                onChange={handleChange}
                placeholder='Title...'
                />

                <input 
                name='url' 
                type='text'
                value={url}
                onChange={handleChange}
                placeholder='URL...'
                />

                <input 
                name='comments' 
                type='text'
                value={comments}
                onChange={handleChange}
                placeholder='Comments...'
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default MapAPI;