const express = require("express");
const chalk = require("chalk");
const path = require("path");
const cookieParser = require("cookie-parser");
const dbConfig = require("./config/db.config");
const mongoose = require("mongoose");
const auth = require("./middlewares/auth");

const {
  addNote,
  getNotes,
  removeNote,
  updateNote,
} = require("./notes.controller");
const { addUser, loginUser } = require("./user.controller");

const port = 3000;
const app = express();

app.set("view engine", "ejs");
app.set("views", "pages");

app.use(express.static(path.resolve(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/login", async (req, res) => {
  res.render("login", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/login", async (req, res) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.cookie("token", token, { httpOnly: true });

    res.redirect("/");
  } catch (e) {
    res.render("login", {
      title: "Express App",
      error: e,
    });
  }
});

app.get("/register", async (req, res) => {
  res.render("register", {
    title: "Express App",
    error: undefined,
  });
});

app.post("/register", async (req, res) => {
  try {
    await addUser(req.body.email, req.body.password);
    res.redirect("/login");
  } catch (e) {
    if (e.code === 11000) {
      res.render("register", {
        title: "Express App",
        error: "Email is already registered",
      });
      return;
    }
    console.error("Creation error", e);
    res.render("register", {
      title: "Express App",
      error: e.message,
    });
  }
});

app.get("/logout", async (req, res) => {
  res.cookie("token", "", { httpOnly: true });
  res.redirect("/login");
});

app.use(auth);

app.get("/", async (req, res) => {
  res.render("index", {
    title: "Запись к врачу",
    // notes: await getNotes(),
    created: false,
    error: false,
  });
});

app.post("/", async (req, res) => {
  try {
    await addNote(
      Date.now(),
      req.body.fio,
      req.body.numberPhone,
      req.body.title,
      req.user.email
    );
    res.render("index", {
      title: "Запись к врачу",
      // notes: await getNotes(),
      created: true,
      error: false,
    });
  } catch (e) {
    console.error("Creation error", e);
    res.render("index", {
      title: "Запись к врачу",
      // notes: await getNotes(),
      created: false,
      error: e.message,
    });
  }
});

app.get("/applicationTable", async (req, res) => {
  res.render("applicationTable", {
    title: "Таблица заявок",
    // notes: await getNotes(),
  });
});

app.get("/applicationTable/:id", async (req, res) => {
  console.log(chalk.magenta("GET"));
  if (req.params.id === "all") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(JSON.stringify(await getNotes()));
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(JSON.stringify(await getNoteById(req.params.id)));
  }
});

app.delete("/applicationTable/:id", async (req, res) => {
  try {
    await removeNote(req.params.id, req.user.email);
    res.render("applicationTable", {
      title: "Таблица заявок",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: false,
    });
  } catch (error) {
    console.error("Deleted error", e);
    res.render("applicationTable", {
      title: "Таблица заявок",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: e.message,
    });
  }
});

app.put("/applicationTable/:id", async (req, res) => {
  try {
    await updateNote(
      {
        id: req.params.id,
        fio: req.body.fio,
        numberPhone: req.body.numberPhone,
        title: req.body.title,
        email: req.user.email,
      },
      req.user.email
    );
    res.render("applicationTable", {
      title: "Таблица заявок",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: true,
      error: false,
    });
  } catch (e) {
    console.error("Creation error", e);
    res.render("applicationTable", {
      title: "Таблица заявок",
      notes: await getNotes(),
      userEmail: req.user.email,
      created: false,
      error: e.message,
    });
  }
});

mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`)
  .then(() => {
    app.listen(port, () => {
      console.log(chalk.green(`Server has been started on port ${port}...`));
    });
  });
