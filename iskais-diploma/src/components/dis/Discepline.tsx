import { Link, useParams } from "react-router-dom";
import Card from "./Card"

import "./scss/discepline.scss"
const books = [
    {
      text: "Банковское дело",
      url: "/main/bank.png",
      alt: "bank"
    },
    {
      text: "Хлебопекарное, макаронное и кондитерское производство",
      url: "/main/bread.png",
      alt: "bread"
    },
    {
      text: "Бухгалтерский учет",
      url: "/main/count.png",
      alt: "count"
    },
    {
      text: "Гостиничное дело",
      url: "/main/Hotel.png",
      alt: "Hotel"
    },
    {
      text: "Стандартизация",
      url: "/main/ISO.png",
      alt: "ISO"
    },
    {
      text: "Маркетинг",
      url: "/main/Marketing.png",
      alt: "Marketing"
    },
    {
      text: "Правоведение",
      url: "/main/Rules.png",
      alt: "Rules"
    },
    {
      text: "Образование",
      url: "/main/School.png",
      alt: "School"
    },
    {
      text: "Саморазвитие",
      url: "/main/Self.png",
      alt: "Self"
    },
    {
      text: "Банковское и страховое дело",
      url: "/main/Strah.png",
      alt: "Strah"
    },
    {
      text: "Технология",
      url: "/main/Tech.png",
      alt: "Tech"
    },
    {
      text: "ВТиПО",
      url: "/main/VTiPO.png",
      alt: "ViTPO"
    }
  ];

const Discepline = () => {
    const { id } = useParams();
    return(
        <div className="discepline">
            <h1>Выбор Книги</h1>
            <article>
               {books.map((obj,i) => (
                <Link to={`/book`}>
                <Card
                key={i} 
                url = {obj.url}
                text={obj.text}
                alt={obj.alt}
                i={i}
                />
                </Link>
               ))}
            </article>
        </div>
        )
}
export default Discepline