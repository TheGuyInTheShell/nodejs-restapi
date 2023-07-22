const validateById =
  (Model = {}) =>
  (options = {}) =>
  async (id = "") => {
    const docExist = await Model.find({
      _id: id,
      ...options,
    });
    if (!docExist.length) {
      throw new Error(`The element with id ${id} doesn't exist`);
    }
  };

module.exports = validateById