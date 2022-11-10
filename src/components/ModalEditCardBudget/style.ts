import styled from "styled-components";

export const StyledModalEdit = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  label {
    font-size: 0.88rem;
    font-weight: 500;

    margin-bottom: 10px;
  }

  input {
    width: 100%;
    height: 50px;

    padding: 10px;
    margin-bottom: 10px;

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

  button {
    margin-top: 10px;
    width: 100%;
    height: 17%;

    border-radius: 10px;
    font-weight: 400;
    font-size: 1rem;

    background-color: rgba(var(--color-purple), 1);
    color: rgba(var(--color-white), 1);
  }
`;
