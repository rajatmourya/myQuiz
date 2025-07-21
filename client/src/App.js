import { useState } from "react";
import Header from "./components/Header";
import AdminLogin from "./pages/Admin/AdminLogin";
import Questions from "./pages/Questions";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null); // changed to null for better clarity

  const handleSignIn = (userData) => {
    setUser(userData);
    setIsSignedIn(true);
  };

  const handleSignUp = (userData) => {
    setUser(userData);
    setIsSignedIn(true);
  };

  return (
    <div>
      {/* <Header /> Uncomment if you have a Header */}

      {/* If user is signed in, show Questions page */}
      {isSignedIn ? (
        <Questions user={user} />
      ) : (
        <>
          {/* Toggle between SignIn and SignUp */}
          {showSignUp ? (
            <Signup setIsSignUP={setShowSignUp} setUser={handleSignUp} />
          ) : (
            <SignIn setIsSignIn={setIsSignedIn} setUser={handleSignIn} />
          )}

          {/* Optional link to switch between SignIn/SignUp */}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <p>
              {showSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => setShowSignUp(!showSignUp)}>
                {showSignUp ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </>
      )}

      {/* <AdminLogin /> Uncomment when needed */}
    </div>
  );
}

export default App;


