import styled from "styled-components";

const getCategoryColor = (category) => {
  switch (category) {
    case "Restaurantes":
      return "rgb(255, 131, 86)";
    case "Farmacias":
      return "rgb(162, 234, 236)";
    case "Mercados":
      return "rgb(189, 226, 109)";
    case "Tortas y postres":
      return "#F9ECA3";
    case "Licores":
      return "#EFB645";
    case "Mascotas":
      return "rgb(255, 203, 149)";
    case "Tecnología":
      return "rgb(178, 247, 245)";
    case "Regalos":
      return "#FA7845";
    case "Ropa":
      return "#D4ABFF";
    case "Sex Shop":
      return "#180035";
    case "Servicios":
      return "#BCCAFF";
    case "PiiddoGO":
      return "#F74342";
    case "Repuestos":
      return "#cfcfc4";
    case "Hogar":
      return "rgb(217, 240, 251)";
  }
}

export const CategoryWrapper = styled.div`
  padding: 20px;
  box-shadow: 0 7px 15px 0 rgba(0,0,0,.05);
  border-radius: 15px;
  width: 100%;
  margin-bottom: 20px;
  background-color: #FFF;

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
  background: ${({ category }) => getCategoryColor(category)};
  border-radius: 12px;

  img {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: center;
  }
`;