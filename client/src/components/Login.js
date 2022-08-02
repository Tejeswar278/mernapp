import {useState} from "react"
import './style.css';

function Login() {
  const [email, setMail] = useState("")
  const [password, setPwd] = useState("")
  async function loginUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    });
    const data = await response.json();
    if(data.user){
      localStorage.setItem('token', data.user)
      alert('login sucessful')
      window.location.href = '/product'
    }
    else{
      alert('Please check the email and password')
    }
  }
  return (
    <div className="App">
      <h1>Login</h1>
      <form onSubmit={loginUser}>
        
        <input 
          value={email}
          onChange={(e) => setMail(e.target.value)}
          type="email" 
          placeholder="Email" 
        /><br></br>
        <input 
          value={password}
          onChange={(e) => setPwd(e.target.value)}
          type="password" 
          placeholder="Password" 
        /><br></br>
        <input type="submit" value="Login"/>
      </form>
    </div>
  );
}

export default Login;
