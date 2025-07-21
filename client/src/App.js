import { useState } from "react";
import Header from "./components/Header";
import AdminLogin from "./pages/Admin/AdminLogin";
import Questions from "./pages/Questions";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";

function App() {
  const [isSignUp, setIsSignUP] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);
  const [user, setUser] = useState([]);
  console.log(user);
  return (
    <div>
      {/* <SignIn setUser={setUser} /> */}
      {!isSignIn ? (
        <SignIn setIsSignIn={setIsSignIn} setUser={setUser} />
      ) : (
        <Questions user={user} />
      )}
        {/* <Questions user={user} /> */}

      {!isSignUp ? (
        <Signup isSignUp={setIsSignUP} setUser={setUser} />
      ) : (
        <Questions user={user} />
      )}
      
      
      
      {/* <AdminLogin /> */}
    </div>
  );
}

export default App;
