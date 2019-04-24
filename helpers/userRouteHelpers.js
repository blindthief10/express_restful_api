const getAllUsers = async (req, res, next) => {

  try {
    const allUsers = await userModel.find({}, {firstName: 1, _id: 0});
    res.status(200).send(allUsers);
  } catch (error) {
    next(error);
  }

}

const getUserByUserName = async (req, res, next) => {

  try {
    const matchUser = await userModel.findOne({userName: req.params.username});
    matchUser ? res.status(200).json(matchUser) : res.status(404).json({message: `User with username ${req.params.username} does not exist`})
  } catch (error) {
    next(error);
  }

}

const updateUserByUserName = async (req, res, next) => {
    try {
      const updatedUser = await userModel.findOneAndUpdate({userName: req.params.username}, req.body, {new: true});
      updatedUser ? res.status(200).json(updatedUser) : res.status(404).send('The user does not exist');
    } catch (error) {
      next(error);
    }

}

const deleteUserByUserName = async (req, res, next) => {

  try {
    const toBeDeleted = await userModel.findOneAndDelete({userName: req.params.username});
    toBeDeleted ? res.status(202).send('Resource was deleted succesfully!') : res.status(404).send('User does not exist')
  } catch(error) {
    next(error);
  }

}

const createUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (errors.isEmpty()) {

    try {
      await userModel.create(req.body);
      res.status(201).json({message: 'The user was created succesfully!'});
    } catch (error) {
      next(error);
    }

  }else {
    next(createError(403, errors.array()[0].msg));
  }

}

module.exports = {getAllUsers, getUserByUserName, updateUserByUserName, deleteUserByUserName, createUser};
