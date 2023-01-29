const Transfers = require('../models/transfers.model');
const Users = require('../models/users.model');

exports.newTransfers = async (req, res) => {
  try {
    const { amount, receiverAccount, senderAccount } = req.body;

    const userReceiver = await Users.findOne({
      where: {
        status: true,
        accountNumber: receiverAccount,
      },
    });

    const userSender = await Users.findOne({
      where: {
        status: true,
        accountNumber: senderAccount,
      },
    });

    if (!userSender) {
      return res.status(404).json({
        status: 'error',
        message:
          'The account from which you are trying to make the transfer does not exist.',
      });
    }

    if (!userReceiver) {
      return res.status(404).json({
        status: 'error',
        message:
          'The account to which you are trying to send the transfer does not exist.',
      });
    }

    if (amount > userSender.amount) {
      return res.status(404).json({
        status: 'error',
        message:
          'The amount to be sent is greater than the amount of the account.',
      });
    }

    if (userReceiver.id === userSender.id) {
      return res.status(404).json({
        status: 'error',
        message: 'You cannot send a transfer to your own account',
      });
    }

    const newAmountUserSender = userSender.amount - amount;
    const newAmountUserReceiver = userReceiver.amount + amount;

    await userSender.update({
      amount: newAmountUserSender,
    });

    await userReceiver.update({
      amount: newAmountUserReceiver,
    });

    await Transfers.create({
      amount,
      senderUserId: userSender.id,
      receiverUserId: userReceiver.id,
    });

    return res.status(200).json({
      status: 'success',
      message: 'The transfer was successful',
      message: `Your new balance is ${newAmountUserSender}`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Internal server error',
    });
  }
};
