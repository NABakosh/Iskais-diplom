import './scss/card.scss'
const Card = ({ text, url, id }) => {
	return (
		<div className={`dis-card  dis-card-${id}`}>
			<img src={'http://localhost:5001' + url} alt={text} width={100} />
			<p>{text}</p>
		</div>
	)
}

export default Card
