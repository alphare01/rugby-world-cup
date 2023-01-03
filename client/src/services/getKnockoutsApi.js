import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

const useGetKnockoutMatches = () => {
    const [knockoutMatches, setKnockoutMatches] = useState(null);

    const [{data, loading: isKnockOutMatchesLoading}, getKnockoutMatches] = useAxios(
        {
            url: `http://localhost:8000/knockoutMatches`,
            method: 'GET'
        },
        { manual: true }
    )

    useEffect(() => {
        if (data) {
            setKnockoutMatches(data)
        }
    }, [data] )

    return [{ knockoutMatches, isKnockOutMatchesLoading }, getKnockoutMatches];
}

export {
    useGetKnockoutMatches
}