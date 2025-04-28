import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		// при загрузке страницы пробуем достать юзера из localStorage
		const savedUser = localStorage.getItem('user')
		if (savedUser) {
			setUser(JSON.parse(savedUser))
		}
	}, [])

	const login = userData => {
		localStorage.setItem('user', JSON.stringify(userData))
		setUser(userData)
	}

	const logout = () => {
		localStorage.removeItem('user')
		setUser(null)
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
