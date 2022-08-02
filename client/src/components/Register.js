import {useState} from "react";
import {useNavigate} from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [name, setName] = useState("")
  const [email, setMail] = useState("")
  const [password, setPwd] = useState("")
  async function registerUser(event){
    event.preventDefault()
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
    const data = await response.json()
if(data.status === 'ok'){
  navigate('/login')
}
    
  }
  return (
    <div className="App">
      <h1>Register</h1>
      <form onSubmit={registerUser}>
        <input 
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text" 
          placeholder="First name" 
        /><br></br>
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
        <input type="submit" value="register"/>
      </form>
    </div>
  );
}

export default Register;
