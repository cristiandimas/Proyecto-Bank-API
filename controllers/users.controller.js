const Users = require('../models/users.model');

exports.createUserAccount = async (req, res) => {
  try {
    const { name, password } = req.body;
    const randomAccountNumber = Math.floor(
      Math.random() * (999999 - 100000) + 100000
    );

    const newUser = await Users.create({
      name: name.toLowerCase(),
      password,
      accountNumber: randomAccountNumber,
    });
    res.status(200).json({
      status: 'success',
      message: 'Method createUsers',
      newUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.loginUser = async (req, res) => {
  try {
    const { password, accountNumber } = req.body;
    const user = await Users.findOne({
      where: {
        status: true,
        accountNumber,
        password,
      },
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'The user is not registered, or the data is not correct',
      });
    }
    return res.status(200).json({
      status: 'success',
      message: 'The user, logged in',
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
exports.getTransfersByUser = async (req, res) => {
  res.json({
    status: 'success',
    message: 'The transfers by users',
  });
};
