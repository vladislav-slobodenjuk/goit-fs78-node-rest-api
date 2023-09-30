import { v2 as cloudinary } from "cloudinary";

const { CLODINARY_CLOUD_NAME, CLODINARY_API_KEY, CLODINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLODINARY_CLOUD_NAME,
  api_key: CLODINARY_API_KEY,
  api_secret: CLODINARY_API_SECRET,
});

export default cloudinary;
