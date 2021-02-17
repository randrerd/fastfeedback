import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import 'firebase/auth';

interface IAuthContext {
  user: firebase.User | null;
  signInWithGithub: () => Promise<firebase.User | null>;
  signout: () => Promise<void>;
}

const authContext = createContext<Partial<IAuthContext>>({});

export function AuthProvider({ children }: { children: JSX.Element }) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<firebase.User | null>(null);

  const signInWithGithub = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    setUser(response.user);
    return response.user;
  };

  const signout = async () => {
    await firebase.auth().signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signInWithGithub,
    signout
  };
}
