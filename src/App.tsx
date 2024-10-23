
// import { useEffect, useState } from 'react';
// import { Route, Routes, useLocation } from 'react-router-dom';
// import Loader from './common/Loader';
// import Main from './pages/Main';
// import SignIn from './pages/Authentication/SignIn';
// import { AuthProvider } from './AuthContext';

// function App() {
//   const [loading, setLoading] = useState<boolean>(true);
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, [pathname]);

//   useEffect(() => {
//     setTimeout(() => setLoading(false), 1000);
//   }, []);

//   return loading ? (
//     <Loader />
//   ) : (
//     <AuthProvider>
//       <Routes>
//         <Route path="/" element={<SignIn />} />
//         <Route path="/dashboard/*" element={<Main />} />
//       </Routes>
//     </AuthProvider>
//   );
// }

// export default App;









import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Loader from './common/Loader';
import Main from './pages/Main';
import SignIn from './pages/Authentication/SignIn';
import { AuthProvider } from './AuthContext';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Check for token in cookies
  const token = Cookies.get('admin');

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider>
      <Routes>
        {/* Redirect to dashboard if token exists */}
        <Route
          path="/"
          element={token ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route path="/dashboard/*" element={<Main />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
