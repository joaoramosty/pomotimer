import styled from "styled-components";

export const LayoutContainer = styled.div`
    max-width:84rem;
    height:(100vh - 10rem); // need for margin 
    margin: 5rem auto;
    padding: 2.5rem;
    background:${(props) => props.theme['gray-800']};
    border-radius: 8px;
    display: flex;
    flex-direction: column;
`;

