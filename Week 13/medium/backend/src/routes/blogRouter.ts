import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { blogInput } from "@developer-crex/common-validation";

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
    const allBlogs = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });
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
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
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

  const { success } = blogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid inputs",
    });
  }

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

  const body = await c.req.json();

  const { success } = blogInput.safeParse(body);

  if (!success) {
    c.status(411);
    return c.json({
      message: "Invalid inputs",
    });
  }

  try {
    await prisma.post.update({
      where: {
        id: body.id,
      },
      data: {
        title: body.title,
        content: body.content,
        published: body.published,
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
