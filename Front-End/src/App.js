import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginPage, SignUpPage, ActivationPage} from "./Routes";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import axios from 'axios';
import { server } from './server';
function App() {
  useEffect(() => {
    axios.get(`${server}/user/getuser`).then((res) => {
      console.log(res.data);
    }).catch((error) => {
      toast.error(error.response.data.message);
      console.log(error);
    } )
  }, [])
  
  return (
    <div>
      
      <Router>
        <Routes>
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
