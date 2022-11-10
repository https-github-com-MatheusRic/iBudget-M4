import styled from "styled-components";

export const AboutUsDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;

  width: 100%;
  height: 90%;

  .text-container {
    width: 100%;
    max-width: 90vw;
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 768px) {
      & {
        width: 90%;
      }
    }

    p {
      font-size: 0.88rem;
      color: rgba(var(--color-white), 0.9);

      @media (min-width: 1024px) {
        & {
          font-size: 1rem;
        }
      }
    }
  }
`;

export const EquipList = styled.ul`
  width: 100%;
  height: 28vh;
  overflow-y: auto;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 15px;

  @media (min-width: 375px) {
    & {
      padding: 0 3%;
      height: 40vh;
    }
  }

  @media (min-width: 650px) {
    & {
      padding: 0;
      flex-direction: row;
      justify-content: center;
      flex-wrap: wrap;
      height: 50vh;
      gap: 10px;
    }
  }

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(var(--color-grey-2), 1);
    border-radius: 10px;
  }
`;
export const ButtonChangeTeam = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30%;
  height: 5vh;
  border-radius: 5px;
  background-color: rgba(var(--color-white));
  color: rgba(var(--color-purple));
  font-weight: 600;
  cursor: pointer;
  :hover{
    background-color: rgba(var(--color-purple));
  color: rgba(var(--color-white));
  outline: 3px solid rgba(var(--color-white));;
  }


`
