import { useNavigate } from 'react-router-dom'
import './scss/error.scss'
const Error = () => {
	const navigate = useNavigate()
	return (
		<div className='error1'>
			<main>
				<p>
					<span>Упс...</span>
					<br></br>Rажется вы перешли на страницу которой нету
				</p>
				<button
					onClick={() => {
						navigate(-1)
					}}
				>
					Вернуться назад
				</button>
			</main>
		</div>
	)
}

export default Error
