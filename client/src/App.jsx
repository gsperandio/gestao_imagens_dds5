import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import GestaoImagem from './views/GestaoImagem';
import TelaLogin from './views/TelaLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<GestaoImagem/>}/>
        <Route path='/login' element={<TelaLogin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
