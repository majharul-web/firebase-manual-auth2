import { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, updateProfile } from "firebase/auth";
import initializeAuthentication from "./FireBase/initialize.firebase";

initializeAuthentication();


function App() {
  // all state heare
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLogeIn, setIsLogeIn] = useState(false);

  const auth = getAuth();


  // get name
  const getName = (e) => {
    setName(e.target.value);
  }
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

    }
    else {
      userRegister(email, password);

    }
  }

  // user resister
  const userRegister = (email, password) => {
    console.log(email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);

        setError('');
        verifyEmail();
        setUserName();
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
        setError('');
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // set user name
  const setUserName = () => {
    updateProfile(auth.currentUser, { displayName: name })
      .then((result) => { }
      )
      .catch((error) => {
        console.log(error.message);
      });
  }

  // verify email
  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(result => {
        console.log(result);
      });
  }

  // reset password
  const restPasswordHandler = () => {
    sendPasswordResetEmail(auth, email)
      .then((result) => { })
  }

  return (
    <div className="container">
      <h1 className='text-danger text-center my-4'>Firebase Manual Authentication</h1>

      <form onSubmit={handleFormSubmit}>

        <h3 className='text-primary mb-2'> {isLogeIn ? 'Please login' : 'Please Register'} </h3>

        {/*Name field  */}


        {!isLogeIn && <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Full Name</label>
          <input type="text" onBlur={getName} className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder='Enter Your Name' required />

        </div>}

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
        {/* reset password button */}
        <button type="submit" onClick={restPasswordHandler} className="btn btn-danger btn-sm mx-3">reset password</button>
      </form>
    </div>
  );
}

export default App;
