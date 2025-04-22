import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "../uploads";
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const filename = Date.now() + "_" + file.originalname.split(" ").join("_");
    cb(null, filename);
  },
});

export const upload = multer({ storage: storage });

cloudinary.config({
  cloud_name: "db0ecop7c",
  api_key: "841778758996758",
  api_secret: "a8EDTJ49Qdj5hPAmU3uRE4ZdBpM",
});

export const sendImageToCloudinary = (path: string, id: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      {
        public_id: id,
      },
      (error, result) => {
        fs.unlinkSync(path);
        if (error) {
          reject(error);
        }
        resolve(result);
      }
    );
  });
};
