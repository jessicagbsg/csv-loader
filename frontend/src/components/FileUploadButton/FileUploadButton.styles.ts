import styled from "styled-components";

export const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const ConfirmButton = styled.button`
  background-color: var(--primary);
  color: var(--background-light);
  max-width: 6rem;
  height: 2.5rem;
  border: none;
  border-radius: 8px;
  padding: 0 1rem;
  font-size: .875rem;
  font-weight: 400;
  &:hover{
    background-color: var(--secondary);
  }
  &.disabled{
    background-color: var(--background-secondary);
`
