const Role = require("./../models/role.model");

exports.createRole = async (req, res, next) => {
  try {
    const newRole = await Role.create(req.body);

    res.status(200).json({
      msg: "role created successfully",
      data: {
        role: newRole,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
    });
  }
};

exports.modifyRole = async (req, res, next) => {
  const { _id, groupId } = req.body;
  const id = req.params.id;

  try {
    await Role.findByIdAndUpdate(id, {
      ...req.body,
      $push: { groups: [groupId] },
    });

    res.status(200).json({
      msg: "role modified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      msg: "error",
      error,
    });
  }
};

// exports.associateGroup = async (req, res, next) => {
//   const id = req.params.id;
//   const { groupId } = req.body;

//   try {
//     await Role.findByIdAndUpdate(id, { $push: { groups: [groupId] } });

//     res.status(200).json({
//       msg: "group associated successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({
//       msg: "error",
//     });
//   }
// };
