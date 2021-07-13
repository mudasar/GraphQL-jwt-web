import { Routes } from './Routes';
import { useState, useEffect } from 'react';
//import { setAccessToken } from './accessToken';
import { getAccessTokenWithRefreshToken } from './GetRefreshToken';
type AppProps = {}
 
export const App:React.FC<AppProps> = () => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadToken = async() => {
            await getAccessTokenWithRefreshToken();
        }
        loadToken();
        setLoading(false);
        return () => {
            
        }
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <Routes />
    );
}