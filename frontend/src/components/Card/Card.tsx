import { CardContainer, CardTitle, CardText } from "./Card.styles";
import { ICard } from "./types";

export function Card({ name, city, country, favorite_sport }: ICard) {
  return (
    <CardContainer>
      <CardTitle>{name}</CardTitle>
      <CardText>{city} - {country} </CardText>
      <CardText>{favorite_sport}</CardText>
    </CardContainer>
  );
}