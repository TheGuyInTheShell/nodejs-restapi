const { Router } = require("express");
const validateJwt = require("../middlewares/validateJwt");
const validateRole = require("../middlewares/validateRole");
const {
  validatePost,
  validateGetSome,
  validatePut,
  validateGetOne,
} = require("../middlewares/product/index");
const {
  addProduct,
  getSomeProducts,
  getProduct,
  deleteProduct,
  editProduct,
} = require("../controllers/products");

const router = Router();

router.get(
  "/",
  [
    validateJwt,
    validateRole(["ADMIN_ROLE", "USER_ROLE", "SELLER_ROLE"]),
    ...validateGetSome,
  ],
  getSomeProducts
);

router.get(
  "/:id",
  [
    validateJwt,
    validateRole(["ADMIN_ROLE", "USER_ROLE", "SELLER_ROLE"]),
    ...validateGetOne,
  ],
  getProduct
);

router.post(
  "/",
  [validateJwt, validateRole(["ADMIN_ROLE", "SELLER_ROLE"]), ...validatePost],
  addProduct
);

router.put(
  "/:id",
  [validateJwt, validateRole(["ADMIN_ROLE"]), ...validatePut],
  editProduct
);

router.delete(
  "/:id",
  [validateJwt, validateRole(["ADMIN_ROLE"]), ...validateGetOne],
  deleteProduct
);

module.exports = router;