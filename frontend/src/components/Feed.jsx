import { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { client } from '../client';
import { feedQuery, searchQuery } from '../utils/data';
import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

const Feed = () => {
    const [loading, setLoading] = useState(false);
    const [pins, setPins] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        setLoading(true);
        if(categoryId){
            const query = searchQuery(categoryId);
           
            client.fetch(query)
              .then(data =>{
                setPins(data);
                setLoading(false)
              });
        }else{
            client.fetch(feedQuery)
            .then(data =>{
                setPins(data);
                setLoading(false)
              });
        }
    }, [categoryId])

    if(loading){
        return (
            <Spinner message="We are adding new " />
        )
    }
    return (
        <div className="">
            {pins.length > 0 && <MasonryLayout pins={pins} /> }
        </div>
    )
}

export default Feed;