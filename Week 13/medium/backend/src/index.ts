import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    AUTH_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.post("/api/v1/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

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

app.post("/api/v1/signin", async (c) => {
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

// Middleware
app.use("/api/v1/blog/*", async (c, next) => {
  try {
    console.log("Middleware")
    const token = c.req.header("authorization") || "";
    const decodedPayload = await verify(token, c.env.AUTH_SECRET);
    if (!decodedPayload) {
      c.status(403);
      return c.json({
        error: "Unauthorized",
      });
    }
    await next();
  } catch (e) {
    return c.status(403);
  }
});

app.post("/api/v1/blog", (c) => {
  return c.text("V1 POST Blog");
});

app.put("/api/v1/blog", (c) => {
  return c.text("V1 PUT Blog");
});

app.get("/api/v1/blogs", (c) => {
  return c.text("V1 GET Blogs");
});

app.get("/api/v1/blog/:id", (c) => {
  return c.text("V1 GET Single Blog");
});

export default app;
