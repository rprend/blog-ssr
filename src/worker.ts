// Define environment interface for D1 database
interface Env {
  GUESTBOOK_DB: any; // D1Database
  ASSETS: any; // Fetcher
}

const VITE_DEV_SERVER = "http://localhost:5173";

// Guestbook API handlers
async function handleGuestbookGet(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const { results } = await env.GUESTBOOK_DB.prepare(
      "SELECT * FROM guestbook_entries ORDER BY created_at DESC LIMIT 100"
    ).all();

    return new Response(JSON.stringify(results), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching guestbook entries:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch entries" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function handleGuestbookPost(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const body = await request.json();
    const { name, message } = body;

    if (!name || !message) {
      return new Response(
        JSON.stringify({ error: "Name and message are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const result = await env.GUESTBOOK_DB.prepare(
      "INSERT INTO guestbook_entries (name, message) VALUES (?, ?)"
    )
      .bind(name, message)
      .run();

    return new Response(
      JSON.stringify({ success: true, id: result.meta.last_row_id }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return new Response(JSON.stringify({ error: "Failed to create entry" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Define route patterns and their handlers
const ROUTE_PATTERNS = [
  // Guestbook API routes
  {
    pattern: /^\/api\/guestbook$/,
    handler: async (request: Request, env: Env) => {
      if (request.method === "GET") {
        return handleGuestbookGet(request, env);
      } else if (request.method === "POST") {
        return handleGuestbookPost(request, env);
      }
      return new Response("Method not allowed", { status: 405 });
    },
  },
];

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname;

    console.log(`[Request] ${request.method} ${path}`);

    // Handle CORS for API requests
    if (path.startsWith("/api/")) {
      const response = new Response();
      response.headers.set("Access-Control-Allow-Origin", "*");
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
      );
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");

      if (request.method === "OPTIONS") {
        return response;
      }
    }

    // Find matching route pattern
    const matchingRoute = ROUTE_PATTERNS.find((route) =>
      route.pattern.test(path)
    );

    if (matchingRoute) {
      try {
        const response = await matchingRoute.handler(request, env);
        console.log(`[Response] ${path} - Status: ${response.status}`);

        // Add CORS headers for API responses
        if (path.startsWith("/api/")) {
          response.headers.set("Access-Control-Allow-Origin", "*");
          response.headers.set(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS"
          );
          response.headers.set("Access-Control-Allow-Headers", "Content-Type");
        }

        return response;
      } catch (e) {
        console.error("Route error:", e);
        const errorResponse = new Response("Internal Server Error", {
          status: 500,
        });
        console.log(`[Response] ${path} - Status: 500 (Error)`);
        return errorResponse;
      }
    }

    const isDev = url.hostname === "localhost" || url.hostname === "127.0.0.1";

    if (!matchingRoute && isDev) {
      console.log(`[Request] Dev server - ${path}`);
      const viteUrl = new URL(path, VITE_DEV_SERVER);
      const response = await fetch(viteUrl.toString(), request as RequestInit);
      console.log(
        `[Response] Dev server - ${path} - Status: ${response.status}`
      );
      return response;
    }

    console.log(`[Request] Assets - ${path}`);
    const response = await env.ASSETS.fetch(request);
    console.log(`[Response] Assets - ${path} - Status: ${response.status}`);
    return response;
  },
};
