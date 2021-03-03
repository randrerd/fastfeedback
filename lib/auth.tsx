import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import 'firebase/auth';
import { createUser } from './db';

type TFormattedUser = {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string | undefined;
  photoUrl?: string | null;
};

interface IAuthContext {
  user: TFormattedUser | null;
  signInWithGithub: () => Promise<void>;
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
  const [user, setUser] = useState<TFormattedUser | null>(null);

  const signInWithGithub = async () => {
    const response = await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GithubAuthProvider());
    handleUser(response.user);
  };

  const signout = async () => {
    await firebase.auth().signOut();
    handleUser(null);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      // if (user) {
      //   setUser(user);
      // } else {
      //   setUser(null);
      // }
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleUser = (rawUser: firebase.User | null) => {
    if (rawUser) {
      const user = formatUser(rawUser);
      createUser(user.uid, user);
      setUser(user);
      return user;
    } else {
      setUser(null);
      return false;
    }
  };

  const formatUser: (user: firebase.User) => TFormattedUser = (user) => {
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0]?.providerId,
      photoUrl: user.photoURL
    };
  };
  return {
    user,
    signInWithGithub,
    signout
  };
}
