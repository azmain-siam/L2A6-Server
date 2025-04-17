import multer from "multer";
// import path from "path";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    // const fileExt = path.extname(file.originalname);

    const filename = Date.now() + "_" + file.originalname.split(" ").join("_");
    // console.log(filename);

    // console.log(fileExt);
    cb(null, filename);
  },
});

export const upload = multer({ storage: storage });
