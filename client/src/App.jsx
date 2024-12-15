import React from 'react';
import {logo} from './assets';
import { Home , CreatePost,Login,SignUp} from './pages';
import { BrowserRouter,Route,Routes,Router,Link } from 'react-router-dom'; 
import { useRecoilState } from 'recoil';
import { userState } from './store/atom/user';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const [user , setUser] = useRecoilState(userState);

  return (
    <BrowserRouter basename="/">
      <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-24 h-24 object-contain" />
        </Link>
        <div className="flex gap-4">
          {!user && (
            <>
              <Link to="/login" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md" >
                Login
              </Link>
              <Link to="/sign-up" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
                SignUp
              </Link>
            </>
          )}
          {user && (
            <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
              Create
            </Link>
          )}
        </div>
      </header>
      <main className="sm:p-8 px-4 py-4 w-full bg-[#f9f8fe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/create-post" 
            element={
              <ProtectedRoute>
                <CreatePost/>
              </ProtectedRoute>
            } 
          />
          <Route path="/login" element={<Login/>} />
          <Route path="/sign-up" element={<SignUp/>} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
