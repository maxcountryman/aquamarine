<h1 align="center">
aquamarine
</h1>

<p align="center">
🐠 A demo of zero-downtime deploys with Docker Compose and Traefik
</p>

## 🎨 Overview

This is a demonstration of a method that uses Docker Compose and Traefik to achieve zero-downtime deployment. I use this same approach to automate deployments to a VPS for projects like [remotejobs.org](https://remotejobs.org).

Checkout the [companion article](https://www.maxcountryman.com/articles/zero-downtime-deployments-with-docker-compose) to read a detailed description of how this works and the benefits of such a workflow.

## 🤸 Usage

> **Note** Ensure that a recent version of Docker is installed and available on your system.

Start the Traefik project:

```sh
$ docker compose --project-name=traefik --file docker-compose.traefik.yml up --detach
```

Now trigger a deployment with the `blue-green-deploy.sh` script:

```sh
$ ./blue-green-deploy.sh
```

Once this process completes, you can visit `https://localhost:80` in your browser. From here, you can continue to make changes to your service and then use the script to deploy them.

> **Warning** `:80` is commonly already bound. If so, consider updating the Traefik configuration to use another port and connect to that instead.

For instance, update `server.js` as such:

```diff
diff --git a/server.js b/server.js
index a137c60..6afa5c7 100644
--- a/server.js
+++ b/server.js
@@ -8,7 +8,7 @@ const HOST = "0.0.0.0";
 const app = express();

 app.get("/", (_req, res) => {
-    res.send("Hello, zero-downtime deployment world");
+    res.send("Hello, blue-green world");
 });

 app.get("/health", (_req, res) => {
```

Now re-run `blue-green-deploy.sh` and this time when you visit the page you should see the new message.
