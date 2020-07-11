import { AvatarStyled, DefaultAvatarWrapperStyled } from "./styled";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

library.add([faUser]);

const Avatar = ({ src }) => {
  return src ? (
    <AvatarStyled src={src} alt="avatar" />
  ) : (
    <DefaultAvatarWrapperStyled>
      <FontAwesomeIcon icon="user" size={24} color="#fff" />
    </DefaultAvatarWrapperStyled>
  );
};

export default Avatar;
