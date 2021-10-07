import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword} from "firebase/auth";
import initializeAuthentication from "./FireBase/initialize.firebase";

initializeAuthentication();


function App() {
  // all state heare
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogeIn, setIsLogeIn] = useState(false);

  const auth = getAuth();


  // handle form info submit
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (password.length < 6) {
      setError('please type 6 or longer password')
      return;
    }

    if (isLogeIn) {
      userLogin(email, password);
      setError('');
    }
    else {
      userRegister(email, password);
      setError('');
    }
  }

  // user resister
  const userRegister = (email, password) => {
    console.log(email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // user login
  const userLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // reset password
  const restPasswordHandler = () => { }



  // get email
  const getEmail = (e) => {
    setEmail(e.target.value);
  }
  // get password
  const getPassword = (e) => {
    setPassword(e.target.value);
  }

  // handle checked 
  const handleChecked = (e) => {
    setIsLogeIn(e.target.checked)
  }


  return (
    <div className="container">
      <h1 className='text-danger text-center my-4'>Firebase Manual Authentication</h1>

      <form onSubmit={handleFormSubmit}>

        <h3 className='text-primary mb-2'> {isLogeIn ? 'Please login' : 'Please Register'} </h3>

        {/*email field  */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" onBlur={getEmail} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email' required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>

        {/* password field */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" onBlur={getPassword} className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
        </div>

        {/* checked button */}
        <div className="mb-3 form-check">
          <input type="checkbox" onClick={handleChecked} className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" htmlFor="exampleCheck1">already login</label>
        </div>

        {/* show error */}
        <h3 className='text-danger'>{error}</h3>

        <button type="submit" className="btn btn-primary">{isLogeIn ? 'Login' : 'Resister'}</button>
        <button type="submit" onClick={restPasswordHandler} className="btn btn-danger btn-sm mx-3">reset password</button>
      </form>
    </div>
  );
}

export default App;
