import { useEffect, useState } from 'react';

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  //TODO(): 
  //Save cookie if received
  // Fetch existing user info
  
  useEffect(() => { 
    fetch('http://localhost:8080/user/info', {credentials: "include", mode: 'cors', headers: {
        'Content-Type': 'application/json'
      }})
      .then(res => {
        if (res === null) throw new Error("Request failed");
        return res.json();
      })
      .then(data => setUserInfo(data))
      .catch(err => console.log('Error fetching user info:', err));
  }, []);
    

  // Handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  //TODO(): 
  //Send cookie and save cookie if received
  //Send data to backend
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:8080/user/login', {
      credentials: "include",
      mode: 'cors',
      method: 'POST', // or PUT depending on your backend
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        console.log('Response:', data);
        setUserInfo(data); // update UI
      })
      .catch(err => console.log('Error sending user info:', err));
  };

  if (!userInfo) return <div>
    <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <br/>

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <br/>



        <button type="submit">Login</button>
    </form>

  </div>;

  return (
    <div>
      <h2>User Info</h2>
      <pre>{JSON.stringify(userInfo, null, 2)}</pre>
    </div>
  );
}

export default UserInfo;