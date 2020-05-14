import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const UlWrapper = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: row;
  margin: 0px;
  padding: 0px;

  li {
    font-size: 12px;

    a {
      color: #332927;
    }
  }
`;

export const ChevronRight = styled(FontAwesomeIcon)`
  margin-left: 5px;
  margin-right: 5px;
`;