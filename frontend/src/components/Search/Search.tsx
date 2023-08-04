import { ChangeEvent } from "react";
import { SearchContainer, SearchInput, SearchText } from "./Search.styles"

interface Props {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Search = ({ onChange }: Props) => {
  return (
    <>
      <SearchContainer>
        <SearchText>Search by:</SearchText>
        <SearchInput onChange={onChange} placeholder="Name" aria-label="name" />
        <SearchInput onChange={onChange} placeholder="City" aria-label="city" />
        <SearchInput onChange={onChange} placeholder="Country" aria-label="country" />
        <SearchInput onChange={onChange} placeholder="Favorite Sport" aria-label="favorite_sport" />
      </SearchContainer>
    </>
  )
}
