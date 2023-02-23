import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavHeader from './NavHeader';
import 'bootstrap/dist/css/bootstrap.min.css';
import sun from './sunnygif.gif';

function App() {
  const testList = ['test1', 'test2', 'test3']
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [members, setMembers] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const getProvider = () => {
    if ('phantom' in window) {
      const provider = window.phantom?.solana;
      if (provider?.isPhantom) {
        return provider;
      };
    }
  }
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3000/members').then((res) => {
        const data = res.data;
        setMembers(data);
      });
    }
    fetchData();
    getProvider();
  }, [])

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3000/members').then((res) => {
        const data = res.data;
        setMembers(data);
      });
    }
    fetchData();
    setSubmitted(false);
  }, [submitted])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post('http://localhost:3000/members/add', JSON.stringify({name: name, email: email}),{
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(result)
      setSubmitted(true);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="App">
      <NavHeader />
      <div className='top-spacer'>
        <h1 style={{
          textAlign: 'center',
          fontSize: '3rem',
          marginBottom: '2rem'
        }}>Aloha.</h1>
        <img src={sun} alt='sunny' className='center' />
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '2rem'
        }}>
          <label htmlFor='name'>Name:</label>
          <input type='text'
            id='name'
            onChange={((e) => setName(e.target.value))}
            required
            /><br />
            <label htmlFor='email'>Email:</label>
            <input type='text'
              id='email'
              onChange={((e) => setEmail(e.target.value))}
              required
              /><br />
            <button>Submit</button>
        </form>
      </div>
      
      <table style={{
        marginBottom: '200px'
      }}>
        <tr>
          <th>Name</th>
          <th>Email</th>
        </tr>
        {members.map((member) => (
          <tr key={member.id}>
            <td>{member.name}</td>
            <td>{member.email}</td>
          </tr>
        ))}
      </table>
    </div>
  );
}

export default App;
