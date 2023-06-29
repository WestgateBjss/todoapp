const express = require("express");
const mongoose = require("mongoose");
const port = 3000;
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/test", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
let db = mongoose.connection;

app.use(express.json());

// For serving static HTML files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.set({
		"Allow-access-Allow-Origin": "*",
	});

	return res.redirect("index.html");
});

app.get("/new", (req, res) => {
	res.set({
		"Allow-access-Allow-Origin": "*",
	});

	return res.redirect("new.html");
});

app.get("/api", (req, res) => {
    try {
        async function search() {
            var dataFound = await db.collection("todos").find().toArray();
            res.json({
                dataFound
            });
        }
        search();
		
    } catch (e) {
        console.log(e)
    }

});

app.post("/formSubmit", (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const completed = req.body.completed;

	const data = {
		title: title,
		description: description,
		completed: completed,
	};

	db.collection("todos").insertOne(
		data, (err, collection) => {
			if (err) {
				throw err;
			}
			console.log("Data inserted successfully!");
		});

	return res.redirect("formSubmitted.html");
});

app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});