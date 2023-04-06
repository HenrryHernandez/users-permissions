const User = require("./../models/user.model");

exports.createUser = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);

    res.status(200).json({
      msg: "user created successfully",
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
    });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.params;

  try {
    await User.findByIdAndDelete(id);

    res.json({ message: "deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
    });
  }
};
