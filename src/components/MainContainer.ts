import styled from "styled-components";

export const MainContainer = styled.main<{ pr?: string; bg?: string }>`
  max-width: 450px;
  width: 100%;
  margin: 0 auto;
  padding: 48px ${(props) => props.pr || "12px"};
  position: relative;
  background-color: ${(props) => props.bg || "white"};
`;
