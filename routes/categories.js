const { Router } = require("express");
const validateJwt = require("../middlewares/validateJwt");
const validateRole = require("../middlewares/validateRole");
const {
  validatePost,
  validateGetSome,
  validatePut,
  validateGetOne,
} = require("../middlewares/category/index");
const {
  addCategory,
  getCategories,
  getCategory,
  editCategory,
  deleteCategory,
} = require("../controllers/categories");

const router = Router();

router.get(
  "/",
  [
    validateJwt,
    validateRole(["ADMIN_ROLE", "USER_ROLE", "SELLER_ROLE"]),
    ...validateGetSome,
  ],
  getCategories
);

router.get(
  "/:id",
  [
    validateJwt,
    validateRole(["ADMIN_ROLE", "USER_ROLE", "SELLER_ROLE"]),
    ...validateGetOne,
  ],
  getCategory
);

router.post(
  "/",
  [validateJwt, validateRole(["ADMIN_ROLE", "SELLER_ROLE"]), ...validatePost],
  addCategory
);

router.put(
  "/:id",
  [validateJwt, validateRole(["ADMIN_ROLE", "SELLER_ROLE"]), ...validatePut],
  editCategory
);

router.delete(
  "/:id",
  [validateJwt, validateRole(["ADMIN_ROLE"]), ...validateGetOne],
  deleteCategory
);

module.exports = router;
