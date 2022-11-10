import styled from "styled-components";

export const MainConteiner = styled.div`
    display: flex;
    width: 100%;
    height: calc(100vh - 67px);
    
    section {
        display: flex;
        justify-content: center;
        width: 50%;
        height: 100%;
        padding-top: 20px;
    }

    section:first-child  {
        & > div {
            width: 24rem;
            top: 100px;
            position: fixed;

            & > div {
                width: 100%;
            }
        };
    }

    section:last-child {
        background-color: rgba(var(--color-purple), 1);
    }
`
