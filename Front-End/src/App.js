import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, SignUpPage, ActivationPage,HomePage} from "./Routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import Store from './redux/store';
import { loadUser } from './redux/actions/user';
function App() {
  useEffect(() => {
    Store.dispatch(loadUser());
    }, []);
  
  return (
    <div>
      
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign_up" element={<SignUpPage />} />
          <Route path="/activation/:activation_token" element={<ActivationPage />} />
        </Routes>
      </Router>
      <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          />
      
        
    </div>

  )
}

export default App;
