import { useState, useCallback, useEffect } from "react";
import { Button } from "reactstrap";
import {
  ModalStyled,
  ModalBodyStyled,
  ModalBodyLeftStyled,
  ModalBodyRightStyled,
  ProductTitleStyled,
  ProductDescriptionStyled,
  ProductCustomSectionTitle,
  ProductCustomSection,
  ProductCustomSectionBody,
  ProductCustomItemStyled,
  CloseButton,
} from "./styled";
import PrettyCheckbox from "../PrettyCheckbox";
import PrettyRadioButton from "../PrettyRadioButton";
import ProductOperator from "../ProductOperator";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useToasts } from "react-toast-notifications";

library.add([faTimes]);

const ProductModal = (props) => {
  const { addToast } = useToasts();
  const { buttonLabel, className, product } = props;
  const [options, setOptions] = useState([]);
  const [extras, setExtras] = useState([]);
  const [companions, setCompanions] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalStorePrice, setTotalStorePrice] = useState();
  const [variations, setVariations] = useState({});
  const [variationsPrice, setVariationsPrice] = useState(0);

  const { isOpen } = props;

  const onChangeOptions = useCallback(
    (selected, opt) => {
      let opts = [];

      if (!selected) {
        const index = options.findIndex((o) => {
          return o.name === opt.name;
        });

        for (let i = 0; i < options.length; i++) {
          if (i !== index) {
            opts.push(options[i]);
          }
        }
      } else {
        opts = [...(options || [])];
        opts.push(opt);
      }

      setOptions(opts);
    },
    [setOptions, options]
  );

  const onChangeCompanions = useCallback(
    (selected, companion) => {
      let comp = [];

      if (!selected) {
        const index = companions.findIndex((o) => {
          return o.id === companion.id;
        });

        for (let i = 0; i < companions.length; i++) {
          if (i !== index) {
            comp.push(companions[i]);
          }
        }
      } else {
        comp = [...(companions || [])];
        comp.push(companion);
      }

      setCompanions(comp);
    },
    [setCompanions, companions]
  );

  const onChangeExtras = useCallback(
    (selected, extra) => {
      let ext = [];

      if (!selected) {
        const index = extras.findIndex((o) => {
          return o.id === extra.id;
        });

        for (let i = 0; i < extras.length; i++) {
          if (i !== index) {
            ext.push(extras[i]);
          }
        }
      } else {
        ext = [...(extras || [])];
        ext.push(extra);
      }

      setExtras(ext);
    },
    [setExtras, extras]
  );

  useEffect(() => {
    /*if (product || isOpen) {
      /*setTotalPrice(product.finalPrice);
      setTotalStorePrice(product.usdPrice);*/
    /*setOptions([]);
      setExtras([]);
      setCompanions([]);
      setVariations({});*
    }*/
    if (!isOpen) {
      setOptions([]);
      setExtras([]);
      setCompanions([]);
      setVariations({});
      setVariationsPrice(0);
    }
  }, [product, isOpen]);

  useEffect(() => {
    if (product) {
      let extraPrices = 0;
      if (extras) {
        for (let i = 0; i < extras.length; i++) {
          extraPrices += extras[i].usdPrice;
        }
      }

      let companionPrices = 0;
      if (companions) {
        for (let i = 0; i < companions.length; i++) {
          companionPrices += companions[i].usdPrice;
        }
      }

      setTotalPrice(
        product.finalPrice + extraPrices + companionPrices + variationsPrice
      );
      setTotalStorePrice(
        product.usdPrice + extraPrices + companionPrices + variationsPrice
      );
    }
  }, [product, extras, companions, variationsPrice]);

  const onAddToCart = useCallback(
    (totalAmount, count, basePrice, totalStoreAmount, baseStorePrice) => {
      // If has variations
      let canAddToCart = true;
      let notifications = {};
      if (product.variations && product.variations.length) {
        // If no variations selected
        for (let i = 0; i < product.variations.length; i++) {
          if (!product.variations[i].isNotRequired) {
            if (!variations[product.variations[i].name]) {
              notifications[product.variations[i].name] = true;
              canAddToCart = false;
            }
          }
        }
      }

      if (canAddToCart) {
        props.onAccept({
          product,
          options,
          companions,
          extras,
          totalAmount,
          totalStoreAmount,
          count,
          basePrice,
          baseStorePrice,
          variations: variations || null,
        });
      } else {
        for (let key in notifications) {
          addToast(`Debe seleccionar al menos un ${key}`, {
            appearance: "error",
            autoDismiss: true,
          });
        }
      }
    },
    [options, extras, companions, product, variations]
  );

  const onChangeVariationOption = useCallback(
    (checked, variation, opt) => {
      if (checked) {
        let previousPrice = 0;
        if (!variations[variation.name]) {
          variations[variation.name] = {};
        } else {
          previousPrice = parseFloat(variations[variation.name].price);
        }

        variations[variation.name] = opt;

        let variationsPrices = 0;
        for (let key in variations) {
          variationsPrices += parseFloat(variations[key].price);
        }

        setVariationsPrice(variationsPrices);

        setVariations({
          ...variations,
        });
      }
    },
    [variations]
  );

  const onCloseModal = () => {
    const { onClose } = props;

    onClose();
  };

  if (!product) {
    return <></>;
  }

  console.log("TotalPRice", totalPrice);

  return (
    <div>
      <ModalStyled
        isOpen={props.isOpen}
        toggle={onCloseModal}
        className={className}
      >
        <ModalBodyStyled>
          <CloseButton onClick={onCloseModal}>
            <FontAwesomeIcon icon="times" />
          </CloseButton>
          <ModalBodyLeftStyled>
            <img src={product.image} alt={product.name} />
          </ModalBodyLeftStyled>
          <ModalBodyRightStyled>
            <ProductTitleStyled>{product.name}</ProductTitleStyled>
            <ProductDescriptionStyled>
              {product.description}
            </ProductDescriptionStyled>

            {product.variations && product.variations.length && (
              <>
                {product.variations.map((variation, index) => {
                  return (
                    <ProductCustomSection key={index}>
                      <ProductCustomSectionTitle>
                        {variation.name}
                      </ProductCustomSectionTitle>

                      <ProductCustomSectionBody>
                        <ul>
                          {variation.options.map((opt) => {
                            return (
                              <ProductCustomItemStyled key={opt.name}>
                                <PrettyRadioButton
                                  label={opt.name}
                                  name={variation.name}
                                  rightLabel={
                                    parseFloat(opt.price) !== 0
                                      ? `+ ${opt.price}$`
                                      : undefined
                                  }
                                  onChange={({ target }) => {
                                    onChangeVariationOption(
                                      target.checked,
                                      variation,
                                      opt
                                    );
                                  }}
                                />
                              </ProductCustomItemStyled>
                            );
                          })}
                        </ul>
                      </ProductCustomSectionBody>
                    </ProductCustomSection>
                  );
                })}
              </>
            )}

            {product.options && product.options.length && (
              <ProductCustomSection>
                <ProductCustomSectionTitle>
                  Personaliza tu pedido
                </ProductCustomSectionTitle>

                <ProductCustomSectionBody>
                  <ul>
                    {product.options.map((opt) => {
                      return (
                        <ProductCustomItemStyled key={opt.name}>
                          <PrettyCheckbox
                            label={opt.name}
                            onChange={({ target }) => {
                              onChangeOptions(target.checked, opt);
                            }}
                          />
                        </ProductCustomItemStyled>
                      );
                    })}
                  </ul>
                </ProductCustomSectionBody>
              </ProductCustomSection>
            )}

            {product.extras && product.extras.length && (
              <ProductCustomSection>
                <ProductCustomSectionTitle>
                  Adicionales
                </ProductCustomSectionTitle>

                <ProductCustomSectionBody>
                  <ul>
                    {product.extras.map((extra) => {
                      return (
                        <ProductCustomItemStyled key={extra.id}>
                          <PrettyCheckbox
                            label={extra.name}
                            rightLabel={`+ ${extra.usdPrice}$`}
                            onChange={({ target }) => {
                              onChangeExtras(target.checked, extra);
                            }}
                          />
                        </ProductCustomItemStyled>
                      );
                    })}
                  </ul>
                </ProductCustomSectionBody>
              </ProductCustomSection>
            )}

            {product.companions && product.companions.length && (
              <ProductCustomSection>
                <ProductCustomSectionTitle>
                  Acompañantes
                </ProductCustomSectionTitle>

                <ProductCustomSectionBody>
                  <ul>
                    {product.companions.map((companion) => {
                      return (
                        <ProductCustomItemStyled key={companion.id}>
                          <PrettyCheckbox
                            label={companion.name}
                            rightLabel={`+ ${companion.usdPrice}$`}
                            onChange={({ target }) => {
                              onChangeCompanions(target.checked, companion);
                            }}
                          />
                        </ProductCustomItemStyled>
                      );
                    })}
                  </ul>
                </ProductCustomSectionBody>
              </ProductCustomSection>
            )}
          </ModalBodyRightStyled>

          <ProductOperator
            basePrice={totalPrice}
            baseStorePrice={totalStorePrice}
            onAddToCart={onAddToCart}
          />
        </ModalBodyStyled>
      </ModalStyled>
    </div>
  );
};

export default ProductModal;

/*function mapStateToProps(state, props) {
  const { product } = state.Products.toJS()

  return {
    product: product
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators({ }, dispatch) }
}


export default connect(mapStateToProps, mapDispatchToProps)(ProductModal);*/
