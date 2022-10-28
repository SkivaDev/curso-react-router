import { HashRouter, Route, Routes } from "react-router-dom";
import BlogPage from "./BlogPage";
import BlogPost from "./BlogPost";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import LogoutPage from "./LogoutPage";
import Menu from "./Menu";
import ProfilePage from "./ProfilePage";
import { AuthProvider, AuthRoute } from "./auth";
function App() {
  return (
    <>
      <HashRouter>
        <AuthProvider>
          <Menu />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/blog" element={<BlogPage />}>
              <Route path=":slug" element={<BlogPost />} />
            </Route>

            <Route path="/profile" element={
              <AuthRoute>
                <ProfilePage />
              </AuthRoute>
            } />
            
            <Route path="/login" element={<LoginPage />} />

            <Route path="/logout" element={
              <AuthRoute>
                <LogoutPage />
              </AuthRoute>
            } />

            <Route path="*" element={<p>Not found 404</p>} />
          </Routes>
        </AuthProvider>
      </HashRouter>
    </>
  );
}

export default App;
