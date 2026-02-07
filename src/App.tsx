import {BrowserRouter as Router, Routes, Route} from 'react-router';
import Layout from './components/Layout';
import Home from './views/Home';
import Profile from './views/Profile';
import Upload from './views/Upload';
import Single from './views/Single';
import Login from './views/Login';
import Logout from './views/Logout';
import { UserProvider } from './contexts/UserContext';

const App = () => {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <UserProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/single" element={<Single />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
};

export default App;