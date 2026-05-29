import app from "./app.js";

const PORT = 4321

app.listen(PORT, () => {
  console.log(`SERVER LISTENING IN http://localhost:${PORT}`);
});
