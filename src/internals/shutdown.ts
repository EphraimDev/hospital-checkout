import http from "http";

export default function handleGracefulShutdown(server: http.Server) {
  server.close(function (err) {
    console.log("Http server closed!");
    if (err) {
      console.error(err);
      process.exit(1);
    }
  });
}
