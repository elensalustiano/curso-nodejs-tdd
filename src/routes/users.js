const findAll = (req, res) => {
  const users = [{
    name: 'John Doe'
  }];
  res.status(200).json(users);
};

const create = (req, res) => {
  res.status(201).json(req.body);
};

module.exports = {
  findAll,
  create
};
