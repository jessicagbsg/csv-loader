import styled from "styled-components";

export const Container = styled.div`
  height: 90vh;
  width: 80vw;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1rem 0;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 10vh;
`;

export const CardsContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 1rem;
  width: 100%;
  overflow-y: auto;
  height: 70vh;
  > p {
    grid-column: 1 / 5;
    text-align: center; 
  }
`;
