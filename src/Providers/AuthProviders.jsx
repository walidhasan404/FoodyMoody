import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { app } from './../firebase/firebase.config';
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const Authcontext=createContext(null)
function AuthProviders({ children }) {
    const auth=getAuth(app)
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const googleProvider = new GoogleAuthProvider();
    const axiosPublic = useAxiosPublic();
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth,email, password);
    }
    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth,googleProvider)
        
    }
    const logOut = () => {
        signOut(auth);
    }
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        console.log("current user", currentUser);
        if (currentUser) {
          const userInfo = {
            email: currentUser.email,
          };
          axiosPublic.post("/jwt", userInfo).then((res) => {
            if (res.data.token) {
              //   console.log("Token received:", res.data.token);
              localStorage.setItem("access-token", res.data.token);
            }
          });
        } else {
          console.log("No token received, removing any existing token");
          localStorage.removeItem("access-token");
        }
        setLoading(false);
      });
      return () => {
        return unsubscribe();
      };
    }, [axiosPublic]);
    const authInfo = {
        user,loading,createUser,signIn,logOut,googleSignIn
    }
  return (
      <Authcontext.Provider value={authInfo}>
          {children}
    </Authcontext.Provider>
  )
}
export default AuthProviders