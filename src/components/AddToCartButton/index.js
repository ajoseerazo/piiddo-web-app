import React from "react";
import { ButtonStyled } from "./styled";

const AddToCartButton = ({ price, onClick }) => {
	return (
		<ButtonStyled onClick={onClick} >
			<div>Agregar</div>
			<div>{price}$</div>
		</ButtonStyled>
	)
}

export default AddToCartButton;