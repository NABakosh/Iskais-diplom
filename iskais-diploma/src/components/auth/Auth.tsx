import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import './scss/auth.scss'
import axios from 'axios'
import { useAuth } from '../context/AuthContext' // путь может отличаться
import { useNavigate } from 'react-router-dom'
let test = 123
const Auth = () => {
	const navigate = useNavigate()
	const { login, user } = useAuth()
	const [login1, setLogin] = useState(true)
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm()

	const handleSetLogin = () => {
		setLogin(!login1)
		reset() // очищаем форму при переключении
	}
	useEffect(() => {
		if (user) {
			navigate(-1)
		}
	})
	const handleClick = () => {
		navigate(-1)
	}
	const onSubmit = async data => {
		console.log('▶ onSubmit вызван с данными:', data)
		try {
			if (login1) {
				console.log('⏳ Попытка входа...')
				const res = await axios.post('http://localhost:5001/login', {
					email: data.email,
					password: data.password,
				})
				alert('Вход выполнен успешно!')
				login(res.data) // сохраняем пользователя
				navigate(-1)
			} else {
				console.log('⏳ Попытка регистрации...')
				const res = await axios.post('http://localhost:5001/register', {
					email: data.email,
					password: data.password,
				})
				alert('Регистрация прошла успешно!')
				setLogin(true)
			}
		} catch (err) {
			console.error('❌ Ошибка при отправке запроса:', err)
			login1 ? alert('Ошибка неверный пароль или логин') : ''
		}
	}
	const testS = () => {
		console.log('✅ Успешный вход:', test)
	}
	setInterval(testS, 1000)

	return (
		<div className='auth'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<article>
					<img src='/logo.png' alt='logo' onClick={handleClick} />
					<h2>{login1 ? 'Войти' : 'Регистрация'}</h2>
				</article>

				<div className={login1 ? 'login_inputs' : 'register_inputs'}>
					<label>
						<p>Введите почту</p>
						<input
							type='email'
							placeholder='Введите почту'
							{...register('email', { required: 'Обязательное поле' })}
						/>
						{errors.email && (
							<span className='error'>{errors.email.message}</span>
						)}
					</label>

					<label>
						<p>Введите пароль</p>
						<input
							type='password'
							placeholder='Введите пароль'
							{...register('password', { required: 'Обязательное поле' })}
						/>
						{errors.password && (
							<span className='error'>{errors.password.message}</span>
						)}
					</label>

					{!login1 && (
						<label>
							<p>Подтвердите пароль</p>
							<input
								type='password'
								placeholder='Введите пароль повторно'
								{...register('confirmPassword', {
									required: 'Обязательное поле',
									validate: (value, formValues) =>
										value === formValues.password || 'Пароли не совпадают',
								})}
							/>
							{errors.confirmPassword && (
								<span className='error'>{errors.confirmPassword.message}</span>
							)}
						</label>
					)}

					<button type='submit'>
						{login1 ? 'Войти' : 'Зарегистрироваться'}
					</button>

					<span>
						{login1 ? 'Нету аккаунта?' : 'Уже есть аккаунт?'}{' '}
						<span className='click' onClick={handleSetLogin}>
							Нажмите здесь
						</span>
					</span>
				</div>
			</form>
		</div>
	)
}

export default Auth
