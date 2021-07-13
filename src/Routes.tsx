import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import { Home } from "./pages/Home";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Bye } from './pages/Bye';
import Header from "./components/Header";

type RoutesProps = {};

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <BrowserRouter>
      <div >
        <Header />
        <div className='container'>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/bye' component={Bye} />
        </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};
