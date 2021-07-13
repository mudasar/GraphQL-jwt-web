import { Link } from "react-router-dom";
import { useMeQuery, useLogoutMutation } from '../generated/graphql';
import { setAccessToken } from '../accessToken';

type HeaderProps = {}
 
const Header:React.FC<HeaderProps> = () => {

    
    const {data, loading, error} = useMeQuery({ errorPolicy: 'all'});
    console.log(loading, data, error);
    const [logout, {client}] = useLogoutMutation();

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to='/'>Dashboard</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    <li><Link to='/register'>Register</Link></li>
                    <li><Link to='/bye'>Bye</Link></li>
                    { data && data.me && <li><button onClick={ async e => {
                        await logout();
                        setAccessToken('');
                        await client!.resetStore();
                    }}>Logout</button></li>}
                </ul>
            
            <ul>
                {loading && <li>Loading ...</li>}
                {data?.me ?<li>{data?.me?.email}</li> : <li>Not logged in</li>}
            </ul>
            </nav>
        </header>
    );
}
 
 
export default Header;