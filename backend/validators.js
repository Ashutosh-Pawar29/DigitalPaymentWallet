const  z  = require("zod");

const signupSchema = z.object({
  firstName: z.string().min(4, "First name must be at least 4 characters"),
  lastName: z.string().min(4, "Last name must be at least 4 characters"),
  username: z.string().email("Invalid email format"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const signinSchema = z.object({
  username: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

module.exports = { signupSchema, signinSchema };
