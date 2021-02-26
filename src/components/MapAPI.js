import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';


const MapAPI = () => {
    const stateData = useSelector(state => state.searchTermCollection);
    const dispatch = useDispatch();
    const inputData = {
        author: '',
        title: '',
        url: '',
        comment: ''
    }
    const [input, setInput] = useState(inputData)
    /*
    find out why when submitting the form 
    the empty array is populating first rather than the data pushed
    to state.


    figure out how to access the data through the numbers in the array
    */

    const handleChange = (e) => {
        const {name, value} = e.target;
        setInput( prevState => ({
            ...prevState,
            [name]: value,
        }))
    }
    // title, url,
    const getApiData = (author) => {
        axios.get(`http://hn.algolia.com/api/v1/search?query=${author}`)
            .then(res => {
                console.log(res.data)
                // console.log(res.data.hits[0].title)

                for (let i = 0; i < res.data.hits.length; i++) {
                    console.log(i.title)

                }
                // dispatch({
                //     type: 'GET_API_DATA',
                //     payload: {
                //          author: input.author,
                //          title: input.title,
                //          url: input.url,
                //          comments: input.comments
                //      }     
                // })
            })
            .catch(err => console.error(err))
   }
   

   const handleSubmit = (e) => {
       e.preventDefault();
       dispatch({
        type: 'ADD_SEARCHED_TERM',
        payload: {
             author: input.author,
             title: input.title,
             url: input.url,
             comments: input.comment
         } 
    })
        setInput({
            author: '',
            title: '',
            url: '',
            comments: ''
        }) 
        console.log(stateData); 
        getApiData(input.author)
        // input.title, input.url,
   }
 
   /*
   
   
   
   */

    return (
        <div>
            <button onClick={() => getApiData()}>get data</button>
            <h1>Search for Data below!</h1>
            <form onSubmit={handleSubmit}>
                <input 
                name='author' 
                type='text'
                value={input.author}
                onChange={handleChange}
                placeholder='Auther...'
                />

                <input 
                name='title' 
                type='text'
                value={input.title}
                onChange={handleChange}
                placeholder='Title...'
                />

                <input 
                name='url' 
                type='text'
                value={input.url}
                onChange={handleChange}
                placeholder='URL...'
                />

                <input 
                name='comment' 
                type='text'
                value={input.comment}
                onChange={handleChange}
                placeholder='Comment...'
                />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default MapAPI;