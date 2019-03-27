
module.exports = (app) => {
  const find = async (req, res) => {
    try {
      const result = await app.services.user.find();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json(app.constant.messages.serverError);
    }
  };

  const create = async (req, res) => {
    try {
      const [result] = await app.services.user.create(req.body);
      res.status(201).json(result);
    } catch (error) {
      if (error.status === 400) return res.status(error.status).json(error.message);
      res.status(500).json(app.constant.messages.serverError);
    }
  };

  return { find, create };
};
