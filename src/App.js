import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav'
import Input from './components/Input';
import Switch from './components/Switch';
import Output from './components/Output';

function App() {
  return (
    <div className="App">
        <Nav/>
        <div className="container">
          <h2 className="text-center my-4 py-4 secondary-text">Welcome to <br/>
            <span className="font-weight-bold">Fake-the-<span className="primary-text">Json</span></span>
          </h2>
          <p></p>
          <div className="row">
            <div className="col-md-5 com-sm-12">
              <Input/>
              </div>
            <div className="col-md-2 com-sm-12">
              <Switch/>
            </div>
            <div className="col-md-5 com-sm-12">
              <Output/>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
