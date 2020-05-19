import React, { useState, useCallback } from "react";
import Dropzone from "../Dropzone";
import ImagePreview from "../ImagePreview";
import {
  PagoMovilWrapper,
  PagoMovilData,
  PaymentButton,
  DropzoneWrapper,
} from "./styled";
import Amount from "../Amount";
import LoadingSVG from "../../loading.svg";
import ImagesAPI from "../../api/images";

const PagoMovil = ({ amount, onClickPayButton, loading }) => {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const onAddCapture = useCallback(
    (file, preview) => {
      setFile(file);
      setPreview(preview);
    },
    [setFile, setPreview]
  );

  const doPayment = useCallback(async () => {
    try {
      setIsLoading(true);
      const url = await ImagesAPI.uploadPaymentSupport(file);

      if (onClickPayButton) {
        onClickPayButton({
          supportUrl: url,
        });
      }
    } catch (err) {
      alert(err);
      alert("Hubo un error procesando el pago, intente de nuevo");
    } finally {
      setIsLoading(false);
    }
  }, [file]);

  return (
    <PagoMovilWrapper>
      <p>Para confirmar la orden debes realizar un pago del siguiente monto</p>

      <Amount currency={"Bs"} value={amount || 0} />

      <p>Al siguiente pago movil</p>

      <PagoMovilData>
        <div>Numero de teléfono: 04145745049</div>
        <div>Cédula: 8055385</div>
        <div>Banco: Mercantil</div>
      </PagoMovilData>

      <p>Y agregar el capture del pago</p>

      <DropzoneWrapper>
        <Dropzone onAddFile={onAddCapture}>
          {preview && <ImagePreview src={preview} />}
        </Dropzone>
      </DropzoneWrapper>

      <PaymentButton disabled={!file || isLoading || loading} onClick={doPayment}>
        {(isLoading || loading) && (
          <div>
            <LoadingSVG />
          </div>
        )}{" "}
        Finalizar pago
      </PaymentButton>
    </PagoMovilWrapper>
  );
};

export default PagoMovil;
