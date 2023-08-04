import styled from "styled-components";

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  background-color: var(--background-secondary);
  padding: 1.25rem;
  height: fit-content;
  border-radius: 8px;
`;

export const CardTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  `;

export const CardText = styled.p`
  font-size: 1rem;
`;