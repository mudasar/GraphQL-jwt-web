import React from 'react';
import './Home.css';
import {  useUsersQuery } from '../generated/graphql';

type HomeProps = {}

export const Home:React.FC<HomeProps>  = () => {

  //const {data, loading} = useHelloQuery();
  const {data, loading, error} = useUsersQuery({fetchPolicy: 'network-only'});

  console.log(error);
  if (loading || !data){
    return <div>Loading ...</div>
  }

  return (
    <div>
      <h1>Home Page</h1>
      <h3>Users List</h3>
      <ol>
        {data.users.map(user => <li key={user.id}>{user.email}  {user.id}</li>)}
      </ol>
    </div>
  );
}
