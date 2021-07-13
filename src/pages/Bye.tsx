import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import {  useByeQuery } from '../generated/graphql';


export const Bye:React.FC<RouteComponentProps>  = ({history}) => {

  //const {data, loading} = useHelloQuery();
  const {data, loading, error} = useByeQuery({errorPolicy: 'all'});

  console.log(error);

  if (loading && !data && !error){
    return <div>Loading ...</div>
  }

  return (
    <div>
      <h1>Bye Page</h1>
        {data?.bye}
        {error?.message}
    </div>
  );
}
