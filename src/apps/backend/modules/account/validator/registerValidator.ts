import { check } from "express-validator";

const RegisterSchema = [
    check("name", "Username is required")
        .exists()
        .isAlphanumeric()
        .withMessage("Username must be alphanumeric")
        .trim()
        .isLength({ min: 3, max: 20 })
        .withMessage("Username must be between 3 and 20 characters"),

    check("username", "username is required")
        .exists()
        .trim()
        .withMessage("username must be a valid email address"),

    check("password", "Password is required")
        .exists()
        .trim()
        .isLength({ min: 8 })
        .withMessage("Password must be a minimum of 8 characters"),
];

export default RegisterSchema;
