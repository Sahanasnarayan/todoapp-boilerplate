import { check } from "express-validator";

const RegisterSchema = [
    check("name", "Username is required")
        .exists()
        .trim()
        .isLength({ min: 5, max: 20 })
        .withMessage("name must be between 5 to 20 characters"),

    check("username", "username is required")
        .exists()
        .trim()
        .isEmail()
        .withMessage("username must be a valid email address"),

    check("password", "Password is required")
        .exists()
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must be of minimum 8 characters"),
];

export default RegisterSchema;
