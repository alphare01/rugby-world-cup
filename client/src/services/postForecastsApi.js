import { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';

const usePostForecasts = () => {
    const [tableData, setTableData] = useState(null);

    const [{data, loading: isTableDataLoading}, postForecasts] = useAxios(
        {
            url: `http://localhost:8000/forecasts`,
            method: 'POST'
        },
        { manual: true }
    )

    useEffect(() => {
        if (data) {
            setTableData(data)
        }
    }, [data] )

    return [{ tableData, isTableDataLoading }, postForecasts];
}

export {
    usePostForecasts
}