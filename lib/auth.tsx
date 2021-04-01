import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';
import 'firebase/auth';
import { createUser } from './db';

export type TFormattedUser = {
  uid: string;
  email: string | null;
  name: string | null;
  provider: string | undefined;
  photoUrl?: string | null;
  token?: string;
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
      handleUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleUser = async (rawUser: firebase.User | null) => {
    if (rawUser) {
      const user = await formatUser(rawUser);
      const { token, ...userWithoutToken } = user;
      createUser(user.uid, userWithoutToken);

      setUser(user);
      return user;
    } else {
      setUser(null);
      return false;
    }
  };

  const formatUser = async (user: firebase.User) => {
    const token = await user.getIdToken();
    return {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      provider: user.providerData[0]?.providerId,
      photoUrl: user.photoURL,
      token
    };
  };

  return {
    user,
    signInWithGithub,
    signout
  };
}
