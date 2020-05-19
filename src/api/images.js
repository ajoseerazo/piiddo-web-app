import { storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";

export default class Images {
  static upload = async (type, file) => {
    const imgFile = storage().ref().child(`${type}/${uuidv4()}`);
    try {
      const image = await imgFile.put(file);

      return image.ref.getDownloadURL();
    } catch (e) {
      throw new Error(e.message);
    }
  };

  static uploadPaymentSupport = async (file) => {
    return Images.upload("payments-supports", file);
  };
}
