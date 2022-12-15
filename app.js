"use strict"
let fs = require("fs");
let http = require("http");
let path = require("path");
let url = require("url");


let express = require("express");
let ejs = require("ejs");
let bodyParser = require("body-parser");
let request = require("request");

let router = express.Router();
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express)

// Routes
router.get("/", (req, res) => {
    res.render("index", {
        pagename: "index"
    })
})

router.get("/about", function(req, res){
    res.render("about", {
        pagename: "about"
    });
})

router.get("/portfolio", function(req, res){
    res.render("portfolio", {
        pagename: "portfolio"
    });
})

router.get("/register", function(req, res){
    res.render("register", {
        pagename: "register"
    });
})

router.post("/login", (req, res) => {
    console.log(req.body);
    let errors = [];
    // Validate the email not blank.
    if(req.body.email.trim() === "") {
        errors.push("Email cannot be blank");
    }

    // Validate the password not blank.
    if(req.body.password.trim() === "") {
        errors.push("Password cannot be blank");
    }

    // Validate the email incorrect format.
    if(!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-.]+$/.test(req.body.email)) {
        errors.push("Invalid Email address");
    }

    // Validate the password incorrect format.
    if(!/^(?=.*[\d])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*.])[\w!@#&%^&*.]{8,}$/.test(req.body.password)) {
        errors.push("Invalid password format");
    }
    res.render("index", {
        pagename: "index",
        errs: errors,
    })
})

router.post("/register", (req, res) => {
    console.log(req.body);
    let errors = [];
    let results;

    // Checking to make sure value is not left blank, otherwise it will use a regular expression to validate.
    if(req.body.fname.trim() === "") {
        errors.push("First name cannot be blank");
    }

    // Checking to make sure value is not left blank, otherwise it will use a regular expression to validate.
    if(req.body.lname.trim() === "") {
        errors.push("Last name cannot be blank");
    }

    // Checking to make sure value is not left blank, otherwise it will use a regular expression to validate.
    if(req.body.address.trim() === "") {
        errors.push("Address cannot be blank");
    }

    // Checking to make sure value is not left blank, otherwise it will use a regular expression to validate.
    if(req.body.city.trim() === "") {
        errors.push("City cannot be blank");
    }

    // Checking to make sure value is not left blank, otherwise it will use a regular expression to validate.
    if(req.body.state.trim() === "") {
        errors.push("State cannot be blank");
    }

    // Checking to make sure value is not left blank, otherwise it will use a regular expression to validate.
    if(req.body.zip.trim() === "") {
        errors.push("Zip cannot be blank");
    }

    // Checking to make sure value is not left to the default value of 'select'.
    if(req.body.age === "select") {
        errors.push("Please select an age");
    }

    // Checking to make sure value is not left undefined.
    if(req.body.genders === undefined) {
        errors.push("Please select a gender");
    }

    // Checking to make sure value is not left undefined.
    if(req.body.consent === undefined) {
        errors.push("Please select the consent checkbox");
    }

    // Checking to make sure value is not left blank, otherwise it will use a regular expression to validate.
    if(req.body.bio.trim() === "") {
        errors.push("Bio cannot be blank");
    }

    // Regular Expression Validation
    // Validate the first name for incorrect format.
    if(!/^[a-zA-Z0-9_.+-]+$/.test(req.body.fname)) {
        errors.push("Invalid first name");
    }

    // Validate the last name for incorrect format.
    if(!/^[a-zA-Z0-9_.+-]+$/.test(req.body.lname)) {
        errors.push("Invalid last name");
    }

    // Validate the address for incorrect format.
    if(!/^\d+\s[A-z]+\s[A-z]+/.test(req.body.address)) {
        errors.push("Invalid address");
    }

    // Validate the city for incorrect format.
    if(!/^[a-zA-Z0-9_.+-]+$/.test(req.body.city)) {
        errors.push("Invalid city");
    }

    // Validate the state for incorrect format.
    if(!/^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR]) |(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))+$/.test(req.body.state)) {
        errors.push("Invalid state");
    }

    // Validate the zip for incorrect format.
    if(!/^\d{5}(?:[-\s]\d{4})?$/.test(req.body.zip)) {
        errors.push("Invalid zip");
    }

    // Validate the bio for incorrect format.
    if(!/^[a-zA-Z0-9?$@#()'!,+\-=_:.&€£*%\s]+$/.test(req.body.bio)) {
        errors.push("Invalid bio");
    }

    // Setting the results for failed or success
    if(errors.length >= 1) {
        results = "Registration Failed";
    } else {
        results = "Registration Successful";
    }

    res.render("register", {
        pagename: "register",
        regErr: errors,
        results: results,
    })
})






// Declare Static File Locations
app.use(express.static("views"));
app.use(express.static("public"));
app.use("/", router);
// Start Server
let server = app.listen("8080", () => {
    console.log("Server running on port 8080");
});