import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage } from "./Routes";
import { SignUpPage } from "./Routes";

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign_up" element={<SignUpPage />} />
        </Routes>
      </Router>
      
    </div>

  )
}

export default App;
