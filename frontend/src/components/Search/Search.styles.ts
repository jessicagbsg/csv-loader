import styled from "styled-components";

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  gap: 1rem;
  width: fit-content;
  @media (max-width: 680px) {
    width:  100%;
    overflow-x: auto;
  }
`

export const SearchInput = styled.input`
  background-color: var(--background-light);
  color: var(--primary);
  max-width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 8px;
  padding: 0 1rem;
  font-size: .875rem;
  font-weight: 400;
  &:focus{
    outline: 1px solid var(--primary);
  }
 
`

export const SearchText = styled.p`
  font-size: 1rem;
  font-weight: 700;
  color: var(--text-primary);
`