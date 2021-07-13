import { setAccessToken } from "./accessToken";

export const getAccessTokenWithRefreshToken = async () => {
    const response = await fetch('http://localhost:4000/refresh-token', {method: 'POST', credentials: "include"});
    const data =  await response.json() as any;
    console.log(data);
    setAccessToken(data.accessToken);
}