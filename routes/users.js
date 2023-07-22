const { Router } = require("express");
const router = Router();
const {
  getUsers,
  postUsers,
  deleteUsers,
  putUsers,
} = require("../controllers/users");

const validatePost = require("../middlewares/user/validatePost");
const validatePut = require("../middlewares/user/validatePut");
const validateGet = require("../middlewares/user/validateGet");
const validateDelete = require("../middlewares/user/validateDelete");
const validateJwt = require("../middlewares/validateJwt");
const validateRole = require("../middlewares/validateRole");

router.get(
  "/",
  [validateJwt, validateRole( ["ADMIN_ROLE", "USER_ROLE"] ), ...validateGet],
  getUsers
);

router.post("/", validatePost, postUsers);

router.delete(
  "/:id",
  [validateJwt, validateRole( ["ADMIN_ROLE"] ), ...validateDelete],
  deleteUsers
);

router.put("/:id", [validateJwt, ...validatePut], putUsers);

module.exports = router;
