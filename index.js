import express from "express";
import path from "path";
import rootRouter from "./routes/root.js";

const app = express();

app.use(express.json());

const __dirname = path.resolve();

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/", rootRouter);

const PORT = process.env.PORT || 3500;

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ message: "404 Page Not Found" });
  } else {
    res.type("txt").send("404 Page Not Found");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
