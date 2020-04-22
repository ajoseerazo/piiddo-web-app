import styled from "styled-components";

export const CategoryWrapper = styled.div`
  padding: 20px;
  box-shadow: 0 7px 15px 0 rgba(0,0,0,.05);
  border-radius: 15px;
  width: 190px;
  margin-left: 20px;
  margin-bottom: 20px;

  a {
    color: black;

    &:hover {
      text-decoration: none;
    }
  }

  p {
    margin-bottom: 0px;
    margin-top: 20px;
    font-size: 14px;
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  padding-top: 100%;
  position: relative;
  background: rgb(255, 131, 86);
  border-radius: 12px;

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`;