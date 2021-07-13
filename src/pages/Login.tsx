import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { setAccessToken } from "../accessToken";
import { useLoginMutation, MeDocument, MeQuery } from '../generated/graphql';

 
export const Login:React.FC<RouteComponentProps> = ({history}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [login] = useLoginMutation();

    return (
        <div>
            <h1>Login Page</h1>
            <form onSubmit={ async e => {
                e.preventDefault();
                console.log(email, password);
                const response = await login({ 
                    variables: {loginPassword: password, loginEmail: email}, 
                    update: (store, {data}) => {
                        if (!data) {
                            return null;
                        }
                        store.writeQuery<MeQuery>({
                            query: MeDocument,
                            data: {__typename: 'Query', me: data.login?.user}
                        })
                    }
                });
                console.log(response);
                if (response && response.data) {
                const token = response.data?.login.accessToken;
                setAccessToken(token);
    
                history.push('/');
                }
            }}>
                <div className="">
                    <label id="emailLabel" htmlFor="email">Email</label>
                    <input id="email" name="email" type="text" placeholder="Email" onChange={e => setEmail(e.target.value)} required value={email} />
                </div>
                <div className="">
                    <label id="passwordLabel" htmlFor="password">Password</label>
                    <input id="password" name="password" type="password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)} required />
                </div>
                <div className="">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
    );
}
