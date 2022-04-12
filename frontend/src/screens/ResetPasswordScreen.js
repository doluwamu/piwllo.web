import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
// import Alert from "../components/Alert";
import ThemeToggleButton from "../components/ThemeToggleButton";
import { ThemeContext } from "../context/ThemeContext";
// import { useSelector, useDispatch } from "react-redux";
// import { loginUser } from "../redux/actions/authActions";
import FormValidationErrors from "../errors/FormValidationErrors";
// import Spinner from "../components/shared/Spinner";

const ResetPassswordScreen = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Form validation error states
  const [passwordRequiredError, setPasswordRequiredError] = useState(false);
  const [passwordMinLengthError, setPasswordMinLengthError] = useState(false);
  const [confirmPasswordRequiredError, setConfirmPasswordRequiredError] =
    useState(false);
  const [confirmPasswordMinLengthError, setConfirmPasswordMinLengthError] =
    useState(false);
  const [passwordsMismatchError, setPasswordsMismatchError] = useState(false);

  const { darkTheme } = useContext(ThemeContext);

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!password) {
      setPasswordRequiredError(true);
      return;
    }

    if (password.length < 8) {
      setPasswordMinLengthError(true);

      if (passwordRequiredError) setPasswordRequiredError(false);
      return;
    }

    if (!confirmPassword) {
      setConfirmPasswordRequiredError(true);
      return;
    }

    if (confirmPassword.length < 8) {
      setConfirmPasswordMinLengthError(true);
      if (confirmPasswordRequiredError) setConfirmPasswordRequiredError(false);
      if (passwordsMismatchError) setPasswordsMismatchError(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordsMismatchError(true);

      if (passwordRequiredError) setPasswordRequiredError(false);
      if (passwordMinLengthError) setPasswordMinLengthError(false);
      return;
    }
  };

  return (
    <>
      {/* Theme tuggle button */}
      <div className="theme-btn-section">
        <div className="theme-btn-container">
          <ThemeToggleButton />
        </div>
      </div>

      <form className={`form-container ${darkTheme ? "dark" : "light"}`}>
        <Link to="/">
          <i className="fa-solid fa-home"></i>
        </Link>

        <h2>Reset Password</h2>

        <div className="form-elements">
          <div className="form-element">
            <label>Enter new password:</label>
            <div className="input-element">
              <input
                type="password"
                name="password"
                placeholder="Write here"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (password && passwordRequiredError) {
                    setPasswordRequiredError(false);
                  }
                }}
              />
              <FormValidationErrors error={passwordRequiredError} />
              <FormValidationErrors
                error={passwordMinLengthError}
                message={"Password must be at least 8 characters long"}
              />
              <FormValidationErrors
                error={passwordsMismatchError}
                message={"Passwords do not match"}
              />
            </div>
          </div>

          <div className="form-element">
            <label>Re-enter new password:</label>
            <div className="input-element">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Write here"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (confirmPassword && confirmPasswordRequiredError) {
                    setConfirmPasswordRequiredError(false);
                  }
                  if (
                    confirmPassword.length >= 8 &&
                    confirmPasswordMinLengthError
                  )
                    setConfirmPasswordMinLengthError(false);
                }}
              />
              <FormValidationErrors error={confirmPasswordRequiredError} />
              <FormValidationErrors
                error={confirmPasswordMinLengthError}
                message={
                  "Confirmation password must be at least 8 characters long"
                }
              />
            </div>
          </div>

          <div className="form-element">
            <button type="submit" onClick={handleResetPassword}>
              Reset password
            </button>
          </div>
        </div>

        <div className="form-links">
          <p>
            or <Link to={"/signin"}>sign in</Link>?
          </p>
        </div>
      </form>
    </>
  );
};

export default ResetPassswordScreen;
