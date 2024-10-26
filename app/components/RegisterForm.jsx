import { useRegisterMutation } from '../services/api';
import { useState } from 'react';

const RegisterForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [register, { isLoading, data, error }] = useRegisterMutation();

  const handleRegister = async () => {
    try {
      await register({ email, password }).unwrap();
      alert('Registration successful!');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleRegister} disabled={isLoading}>Register</button>
      {error && <p>Error: {error.data.message}</p>}
    </div>
  );
};

export default RegisterForm;
