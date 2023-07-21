import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, SignUpPage, ActivationPage} from "./Routes";

function App() {
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />
        </Routes>
      </Router>
      
    </div>

  )
}

export default App;
