import User from "../../models/userModel.js";
import AppError from "../../error/appError.js";

// Request type: DELETE
// To: /api/v1/users/user/delete
// Desc: for user to delete their account
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return next(new AppError("User does not exist", 400));
    }
    await user.remove();

    return res.json({ message: "User successfully deleted!" });
  } catch (error) {
    return next(error);
  }
};

export default deleteUser;
