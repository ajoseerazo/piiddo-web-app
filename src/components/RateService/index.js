import { useState, useCallback } from "react";
import {
  ModalStyled,
  ModalBodyStyled,
  AvatarWrapper,
  StarsWrapper,
  Textarea,
  ButtonStyled,
  LinkButtonStyled,
  Title,
} from "./styled";
import StarRatings from "react-star-ratings";
import Router from "next/router";

const RateService = ({ isOpen, rider }) => {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState(null);

  const changeRating = useCallback(
    (rating) => {
      setRating(rating);
    },
    [setRating]
  );

  const setCommentsHandler = useCallback(({ target }) => {
    setComments(target.value);
  });

  const sendRate = useCallback(() => {
    goToHome();
  });

  const goToHome = useCallback(() => {
    Router.push("/");
  });

  return (
    <ModalStyled isOpen={isOpen}>
      <ModalBodyStyled>
        <Title>Valora a nuestro Piiddo Rider</Title>

        <AvatarWrapper>
          <img src={rider.avatar} />
        </AvatarWrapper>

        <StarsWrapper>
          <StarRatings
            rating={rating}
            starRatedColor="#f74342"
            numberOfStars={5}
            starDimension="30px"
            starSpacing="2px"
            changeRating={changeRating}
          />
        </StarsWrapper>

        <Textarea
          placeholder="Tienes algún comentario adicional"
          rows="3"
          onChange={setCommentsHandler}
        ></Textarea>

        <ButtonStyled disabled={!rating} onClick={sendRate}>
          Enviar
        </ButtonStyled>

        <LinkButtonStyled onClick={goToHome}>
          Omitir
        </LinkButtonStyled>
      </ModalBodyStyled>
    </ModalStyled>
  );
};

export default RateService;
