import { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useRegisterMutation } from "../generated/graphql";

 
export const Register:React.FC<RouteComponentProps> = ({history}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [register] = useRegisterMutation();

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={ async e => {
                e.preventDefault();
                console.log(email, password);
                const response = await register({ variables: {registerPassword: password, registerEmail: email}});
                console.log(response);
                history.push('/');
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
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
    );
}

