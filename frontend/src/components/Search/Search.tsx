import { useState } from "react";
import { SearchContainer, SearchInput, SearchText } from "./Search.styles";

import type { IFilters } from "../../types";

interface Props {
  onChange: (filters: IFilters) => void;
}

export const Search = ({ onChange }: Props) => {
  const [inputValues, setInputValues] = useState<Partial<IFilters>>({
    name: "",
    city: "",
    country: "",
    favorite_sport: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, filterKey: keyof IFilters) => {
    const value = e.target.value;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [filterKey]: value,
    }));

    const updatedFilters: IFilters = {
      ...inputValues,
      [filterKey]: value,
    };
    onChange(updatedFilters);
  };

  return (
    <SearchContainer>
      <SearchText>Search by:</SearchText>
      <SearchInput onChange={(e) => handleInputChange(e, "name")} placeholder="Name" aria-label="name" />
      <SearchInput onChange={(e) => handleInputChange(e, "city")} placeholder="City" aria-label="city" />
      <SearchInput onChange={(e) => handleInputChange(e, "country")} placeholder="Country" aria-label="country" />
      <SearchInput onChange={(e) => handleInputChange(e, "favorite_sport")} placeholder="Favorite Sport" aria-label="favorite_sport" />
    </SearchContainer>
  );
};