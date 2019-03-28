module.exports = (app) => {
  const create = async (req, res, next) => {
    try {
      const [result] = await app.services.account.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  };

  const find = async (req, res, next) => {
    try {
      const result = await app.services.account.find();
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  const findById = async (req, res, next) => {
    try {
      const [result] = await app.services.account.find(req.params);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  const update = async (req, res, next) => {
    try {
      const [result] = await app.services.account.update(req.params, req.body);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };

  const remove = async (req, res, next) => {
    try {
      await app.services.account.remove(req.params);
      res.status(204).end();
    } catch (error) {
      next(error);
    }
  };

  return {
    create, find, findById, update, remove
  };
};
