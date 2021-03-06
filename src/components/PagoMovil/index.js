import React, { useState, useCallback } from "react";
import Dropzone from "../Dropzone";
import ImagePreview from "../ImagePreview";
import {
  PagoMovilWrapper,
  PagoMovilData,
  PaymentButton,
  DropzoneWrapper,
  BankInfo,
  BankInfoName,
} from "./styled";
import Amount from "../Amount";
import LoadingSVG from "../../loading.svg";
import ImagesAPI from "../../api/images";

const bankAccounts = [
  {
    name: "Banco Provincial",
    accountNumber: "0108-0334-9701-0037-9275",
    accountType: "Corriente",
    accountName: "Piiddo C.A",
    accountDocumentType: "NIT",
    accountDocumnetNumber: "J-500258933",
  },
];

const PagoMovil = ({ amount, onClickPayButton, loading, type }) => {
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
      <p>
        <span>
          Para confirmar la orden debes realizar un pago del siguiente monto
        </span>
      </p>

      <Amount currency={type === "zelle" ? "$" : "Bs"} value={amount || 0} />

      <p>
        {type === "pago-movil" && <span>Al siguiente pago movil</span>}
        {type === "bank-transfer" && (
          <span>A alguna de las siguientes cuentas bancarias</span>
        )}
        {type === "zelle" && <span>A la siguiente cuenta de Zelle</span>}
      </p>

      <PagoMovilData>
        {type === "pago-movil" && (
          <div>
            <div>Numero de teléfono: 04121003427</div>
            <div>NIT: J-50025893-3</div>
            <div>Banco: Provincial</div>
          </div>
        )}
        {type === "bank-transfer" && (
          <div>
            {bankAccounts.map((ba) => {
              return (
                <BankInfo>
                  <BankInfoName>{ba.name}</BankInfoName>
                  <div>Numero de cuenta: {ba.accountNumber}</div>
                  <div>Tipo de cuenta: {ba.accountType}</div>
                  <div>Titular de la cuenta: {ba.accountName}</div>
                  <div>Tipo de documento: {ba.accountDocumentType}</div>
                  <div>Número de documento: {ba.accountDocumnetNumber}</div>
                </BankInfo>
              );
            })}
          </div>
        )}
        {type === "zelle" && (
          <div>
            <div>Correo: douglaserazo978@gmail.com</div>
            <div>Nombre: Douglas Erazo</div>
          </div>
        )}
      </PagoMovilData>

      <p>Y agregar el capture del pago</p>

      <DropzoneWrapper>
        <Dropzone onAddFile={onAddCapture}>
          {preview && <ImagePreview src={preview} />}
        </Dropzone>
      </DropzoneWrapper>

      <PaymentButton
        disabled={!file || isLoading || loading}
        onClick={doPayment}
      >
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
