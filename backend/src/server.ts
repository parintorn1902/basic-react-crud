import http from "http";
import createApplication from "./app/app";

(async () => {
  const port = process.env.PORT || "4000";

  const app = await createApplication();

  const server = http.createServer(app);

  server.listen(port, () => {
    console.log(`\u001b[1;32m:: Server is running on port ${port}`);
  });
})();
