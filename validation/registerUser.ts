
import { z } from 'zod'

export const registerUserSchema = z.object({
    email: z.string().email(),
    name: z.string().min(2, "Name must be al least 2 characters"),
    password: z.string().refine((value) => {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
        return regex.test(value)
    }, {
        message: 'Password must contain at least 6 caracters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special caracter',
    },
    ),
    passwordConfirm: z.string(),
}).superRefine((data, ctx) => {
    if (data.password !== data.passwordConfirm) {
        ctx.addIssue({
            message: "Password do not match",
            path: ["passwordConfirm"],
            code: "custom",
        })
    }
})
