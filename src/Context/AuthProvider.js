import React, { createContext, useState } from 'react'

const AuthContext = createContext(null);


export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(
        {
            currentUser: {},
            isAuth: false,
        }
    )

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
