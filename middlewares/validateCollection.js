const validateCollection =
  (availableCollections = []) =>
  async (collection = "") => {
    if (!availableCollections.includes(collection)) {
      throw new Error(`The element with id ${id} doesn't exist`);
    }
  };

module.exports = validateCollection;
