import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Signup';
import {Routes, Route, useNavigate} from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    
    <div className='body'>
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/' element={<button className='btn btn-primary' onClick={()=>navigate('/signup')}>Signup</button>} />
      </Routes>
      
    </div>
   
  );
}

export default App;
