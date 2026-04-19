import { useEffect, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import UserInfo from './UserInfo';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

function Home() {
  const [subjects, setSubjects] = useState([]);
  const [classesList, setClassesList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/dict/subjects')
      .then(res => res.json())
      .then(data => setSubjects(data))
      .catch(err => console.error('Error fetching subjects:', err));

    fetch('http://localhost:8080/dict/classes')
      .then(res => res.json())
      .then(data => setClassesList(data))
      .catch(err => console.error('Error fetching classes:', err));
  }, []);

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />

      <nav>
        <Link to="/">Home</Link> |{" "}
        <Link to="/user/info">User Info</Link>
      </nav>

      <h2>Subjects</h2>
      <ul>
        {subjects.map(subject => (
          <li key={subject.id}>{subject.name}</li>
        ))}
      </ul>

      <h2>Classes</h2>
      <ul>
        {classesList.map(cls => (
          <li key={cls.id}>{cls.name}</li>
        ))}
      </ul>
    </header>
  );
}

function App() {
  return (
    <BrowserRouter>
      <DataProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/info" element={<UserInfo />} />
          </Routes>
        </div>
      </DataProvider>
    </BrowserRouter>
  );
}

export default App;