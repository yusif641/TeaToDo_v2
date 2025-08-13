import multer, { type FileFilterCallback } from "multer";
import { PATHS } from "../../config/constants";
import type { Request } from "express";
import { existsSync, mkdirSync } from "fs";

const storage = multer.diskStorage({
    destination(req, res, cb) {
        if (!existsSync(`./${PATHS.IMAGE_PATHS}`)) {
            mkdirSync(`./${PATHS.IMAGE_PATHS}`, { recursive: true });
        }

        cb(null, PATHS.IMAGE_PATHS);
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + "-" + file.originalname);
    }
});

const types = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (types.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

export default multer({ storage, fileFilter });