import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signupInput } from "@developer-crex/common-validation";

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    AUTH_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const { success } = signupInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs are incorrect",
    });
  }

  try {
    // check if the email already present or not
    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return c.json({
        msg: "User already exists",
      });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
      },
    });

    const token = await sign(
      {
        id: user.id,
      },
      c.env.AUTH_SECRET
    );

    return c.json({
      jwt: token,
    });
  } catch (e) {
    return c.status(403);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({
        error: "User doesn't exist",
      });
    }

    const token = await sign(
      {
        id: user.id,
      },
      c.env.AUTH_SECRET
    );

    return c.json({
      jwt: token,
    });
  } catch (error) {
    return c.status(403);
  }
});

export default userRouter;
