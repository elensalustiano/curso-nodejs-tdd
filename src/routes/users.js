
module.exports = (app) => {
  const find = async (req, res, next) => {
    try {
      const result = await app.services.user.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  const create = async (req, res, next) => {
    try {
      const [result] = await app.services.user.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  return { find, create };
};
