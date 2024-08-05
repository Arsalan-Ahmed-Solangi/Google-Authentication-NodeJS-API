import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { googleLogout } from '@react-oauth/google';
function App() {
  const [data,setData] = useState(null);
  const logout = ()=>{

    googleLogout();
  }
  return (
    <>
      <div>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h2>Google Authentication </h2>
      <GoogleLogin
     
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse?.credential);
          setData(decoded);
          console.log(decoded);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      { data && <>
        <div style={{ justifyContent:"start",alignItems:"center" }}> 

          <h4> Name : { data.name  } </h4>
          <h4> Email : { data.email  } </h4>
          <h4> Email Verfied : { ( data.email_verified === true ) ? 'True' : 'False'     } </h4>
          <img src={ data.picture }/>
          <br/>
          <button onClick={logout} >Logout</button>
        </div>
      </> }
      
    </>
  );
}

export default App;
