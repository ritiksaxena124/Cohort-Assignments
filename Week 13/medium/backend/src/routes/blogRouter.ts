import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    AUTH_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// All blog routes


// Todo: Add pagination
// Get all blogs
blogRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const allBlogs = await prisma.post.findMany();
    return c.json({
      allBlogs,
    });
  } catch (error) {
    return c.json({
      error: "Failed to fetch blogs",
    });
  }
});

// Get a particular blog
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const id = c.req.param("id");
  try {
    const blog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });
    return c.json({
      blog,
    });
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Failed to fetch blog",
    });
  }
});


// Middleware
blogRouter.use("/*", async (c, next) => {
  const token = c.req.header("authorization") || "";
  try {
    const decodedPayload = await verify(token, c.env.AUTH_SECRET);
    if (!decodedPayload) {
      c.status(403);
      return c.json({
        error: "Unauthorized",
      });
    }

    c.set("userId", decodedPayload.id);
    await next();
  } catch (e) {
    c.status(403);
    return c.json({
      error: "Unauthorized",
    });
  }
});


// Add a blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  try {
    const userId = c.get("userId");

    const response = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userId,
      },
    });

    return c.json({
      blogId: response.id,
    });
  } catch (error) {
    c.status(411);
    return c.json({
      error: "Unable to create blog post",
    });
  }
});

// Update content of a blog
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const data = await c.req.json();

  try {
    await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        content: data.content,
        published: data.published,
      },
    });

    c.status(201);
    return c.json({
      message: "Blog post updated successfully",
    });
  } catch (e) {
    c.status(411);
    return c.json({
      error: "Unable to update blog",
    });
  }
});

export default blogRouter;
