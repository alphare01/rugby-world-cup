import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

const useGetPoolMatches = () => {
    const [poolMatches, setPoolMatches] = useState(null);

    const [{data, loading: isPoolMatchesLoading}, getPoolMatches] = useAxios(
        {
            url: `http://localhost:8000/poolMatches`,
            method: 'GET'
        },
        { manual: true }
    )

    useEffect(() => {
        if (data) {
            setPoolMatches(data)
        }
    }, [data] )

    return [{ poolMatches, isPoolMatchesLoading }, getPoolMatches];
}

export {
    useGetPoolMatches
}