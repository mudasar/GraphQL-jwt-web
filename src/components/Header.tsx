import { Link } from "react-router-dom";
import { useMeQuery } from "../generated/graphql";

type HeaderProps = {}
 
const Header:React.FC<HeaderProps> = () => {

    const {data, loading} = useMeQuery();

    return (
        <header>
          <nav>
              <ul>
                  <li><Link to='/'>Dashboard</Link></li>
                  <li><Link to='/login'>Login</Link></li>
                  <li><Link to='/register'>Register</Link></li>
                  <li><Link to='/bye'>Bye</Link></li>
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