import React, { useState } from 'react';
import '../assets/adminlogin.css';
import { url } from '../Constants';
import { AlertMessage } from './Support/AlertMessage';


const Adminlogin = () => {

  const [UserName, setUsername] = useState();
  const [Password, setPassword] = useState();
  const [notify, setNotify] = useState({ isOpen: false, message: '', variant: 'filled', severity: 'error' });

  setInterval(localStorage.clear, (2.592e+8));





  const Registration = () => {

    fetch(`${url}/adminlogin.php`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain,*/*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: UserName,
        password: Password
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result === 'Invalid Username' || result === 'Invalid Password') {
            setNotify({
              ...notify,
              isOpen:true,
              message:result
            })
          }
          else {
            localStorage.setItem('username', UserName);
            window.location.reload();


          }
        }).catch((error) => {
          console.error(error);
        });
  }


  return (
    <div className="adminlogin">
      <AlertMessage
        notify={notify}
        setNotify={setNotify}
      />
      <h1>Admin Login</h1>
      <i class="fas fa-user"></i>
      <TextField placeholder={'Enter username'} onChange={event => setUsername(event.target.value)} />
      <TextField type="password" placeholder={'Enter password'} onChange={event => setPassword(event.target.value)} />
      <button className="bt2" onClick={() => Registration()} >Submit</button>

    </div>
  );


}

export default Adminlogin;
