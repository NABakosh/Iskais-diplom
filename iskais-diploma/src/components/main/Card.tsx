import './scss/card.scss'
const Card = ({ text, alt, url, i }) => {
	return (
		<div className={`card  card-${i}`}>
			<img src={url} alt={alt} width={100} />
			<p>{text}</p>
		</div>
	)
}

export default Card
