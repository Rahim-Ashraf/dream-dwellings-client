import {
    GithubAuthProvider,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    getAuth, onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup, signOut,
    updateProfile
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null)

const Provider = ({ children }) => {
    const axiosPublic = useAxiosPublic();

    const [loading, setLoading] = useState(true)
    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const [user, setUser] = useState(null)
    const emailRegister = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const emailLogin = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const githubLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, githubProvider)
    }

    const logOut = () => {
        setLoading(true)
        signOut(auth)
            .then()
            .catch();
    }

    const updateUser = (name, photoURL) => {
        setLoading(true)
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoURL
        })
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                const jwtUser = { email: currentUser.email };
                axiosPublic.post('/jwt', jwtUser)
                    .then((res) => {
                        localStorage.setItem("access-token", res.data.token)
                    })
            }
            else {
                localStorage.removeItem("access-token")
            }
            setLoading(false);
        });
        return () => {
            unSubscribe()
        }

    }, [auth, axiosPublic])

    const data = {
        emailRegister,
        emailLogin,
        googleLogin,
        githubLogin,
        user,
        logOut,
        updateUser,
        loading
    }
    return (
        <div>
            <AuthContext.Provider value={data}>
                {children}
            </AuthContext.Provider>
        </div>
    );
};

export default Provider;