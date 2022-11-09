import styled from "styled-components";

export const ConteinerModal = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  background-color: rgba(var(--color-black), 0.6);

  @media (max-width: 520px) {
    padding: 0px 5% 0px 5%;
  }
`;

export const StyledModalUserInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
    /* background-color: blue; */

  label {
    font-size: 0.88rem;
    font-weight: 500;

    margin-bottom: 10px;
  }

  input {
    width: 100%;
    height: 40px;

    padding: 5px;
    margin-bottom: 5px;

    font-size: 0.81rem;

    border-radius: 8px;
    border: 1px solid rgba(var(--color-purple));
    outline: none;

    &::placeholder {
      color: rgba(var(--color-grey-1));
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }

  & > div {
    display: flex;
    justify-content: space-between;

    button {
      margin-top: 10px;
      width: 45%;
      height: 50px;

      border-radius: 10px;
      font-weight: 400;
      font-size: 1rem;

      background-color: rgba(var(--color-purple), 1);
      color: rgba(var(--color-white), 1);
    }
  }
`;

export const Modal = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 30rem;
  height: 31rem;
  background-color: rgba(var(--color-white), 1);
  border-radius: 8px;
  padding: 18px 27px 15px 27px;
  border: 1px solid rgba(var(--color-purple), 1);

  & > div {
    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    & > h2 {
      font-family: var(--font-forms-base);
      font-style: normal;
      font-weight: 700;
      font-size: 22px;
      line-height: 19px;
    }

    & > span {
      position: absolute;

      right: 0;

      font-family: var(--font-forms-base);
      font-weight: 600;
      font-size: 21px;
      cursor: pointer;
    }
  }

  @media (max-width: 520px) {
    width: 100%;
  }
`;

export const ConteinerFormModal = styled.div`
  /* padding-top: 20px; */
  height: 100%;

  & > form {
    /* height: 25rem; */
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    & > button {
      margin-top: 10px;
      border-radius: 10px;
      height: 40px;
      width: 100%;
      background-color: rgba(var(--color-purple), 1);

      font-family: var(--font-forms-base);
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: rgba(var(--color-white), 1);

      cursor: pointer;

      &:hover {
        background-color: rgba(var(--color-purple-light), 1);
      }
    }

    & > input {
      outline: none;
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
`;
