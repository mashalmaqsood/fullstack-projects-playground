const { User } = require("../../db/models");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const dotenv = require("dotenv");

dotenv.config();

// Validation schema using Joi
const userValidationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

//Register user
module.exports = {
  Mutation: {
    registerUser: async (_, args) => {
      try {
        const { name, email, password, username, plan } = args;
        const { error } = userValidationSchema.validate(args);
        if (error) throw new Error(error.details[0].message);

        // Check if the user already exists
        const userExists = await User.findOne({ where: { email } });
        if (userExists) throw new Error("User already exists");

        const hashedPassword = await User.hashPassword(password);

        const newUser = await User.create({
          name,
          username,
          email,
          password: hashedPassword,
          plan,
        });

        const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
          expiresIn: "30d",
        });
        return { user: newUser, token };
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },
};

//Login user
module.exports = {
  Mutation: {
    loginUser: async (_, args, context) => {
      try {
        const { email, password } = args;
        const { res } = context;
        // Validate input data
        const { error } = userValidationSchema.validate(args);
        if (error) throw new Error(error.details[0].message);

        const user = await User.findOne({ where: { email } });
        if (!user) throw new Error("Invalid email or password");

        const isMatch = await User.comparePassword(password, user.password);
        if (!isMatch) throw new Error("Invalid email or password");

        const token = jwt.sign(
          { id: user.id, plan: user.plan },
          process.env.JWT_SECRET,
          {
            expiresIn: "30d",
          }
        );
        res.cookie("token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        res.cookie("plan", user.plan, {
          httpOnly: false,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        return { user, token };
      } catch (err) {
        console.error(err);
        throw new Error(err);
      }
    },
  },
};
