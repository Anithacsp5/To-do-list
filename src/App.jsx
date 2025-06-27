import './App.css';
import Login from './assets/component/Login.jsx';
import ToList from './assets/component/ToList.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ToList" element={<ToList />} />
      </Routes>
    </Router>
  );
}

export default App;
