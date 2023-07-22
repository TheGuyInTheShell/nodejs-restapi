const { Router } = require("express");
const { param } = require("express-validator");
const validateJwt = require("../middlewares/validateJwt");
const validateRole = require("../middlewares/validateRole");
const validateCollection = require("../middlewares/validateCollection");
const validateFinal = require("../middlewares/validateFinal");

const {
  changeFile,
  deleteFile,
  saveFile,
  getFile,
} = require("../controllers/uploads");

const router = Router();

router.post(
  "/",
  [
    validateJwt,
    validateRole(["ADMIN_ROLE", "SELLER_ROLE", "USER_ROLE"]),
    validateFinal,
  ],
  saveFile
);

router.put(
  "/:collection/:id",
  [
    validateJwt,
    param("id").isMongoId(),
    param("collection").custom(validateCollection(["users", "products"])),
    validateRole(["ADMIN_ROLE", "SELLER_ROLE", "USER_ROLE"]),
    validateFinal,
  ],
  changeFile
);

router.get(
  "/:collection/:id",
  [
    validateJwt,
    param("id").isMongoId(),
    param("collection").custom(validateCollection(["users", "products"])),
    validateRole(["ADMIN_ROLE", "SELLER_ROLE", "USER_ROLE"]),
    validateFinal,
  ],
  getFile
);

router.delete(
  "/:id",
  [validateJwt, validateRole(["ADMIN_ROLE"]), validateFinal],
  deleteFile
);

module.exports = router;
