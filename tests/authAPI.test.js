const request = require("supertest");
const User = require("../models/User");
const app = require("../app");
const mongoose = require('mongoose');

//
// Tests /routes/api/auth.js
//


const title = "Mr";
const firstname = "API";
const lastname = "Testing";
const phoneno = "00000000000";
const dob = "01/01/2000";
const uni = "Testing University";
const course = "Jest Testing";
const address = "123 Test Street";
const city = "Testville";
const postcode = "NE12345";
const email = "testauth@test.com";
const password = "test123";
const password2 = "test123";


beforeAll(async () => {
    //Creates an account for testing
    await request(app).post("/api/users").send({
        title,
        firstname,
        lastname,
        phoneno,
        dob,
        uni,
        course,
        address,
        city,
        postcode,
        email,
        password,
        password2
    })
});

test("Shouldn't login with no details", async () => {
    const response = await request(app)
    .post("/api/auth")
    .send({
        email: "",
        password: ""
    }).expect(400);
});

test("Shouldn't login with incorrect password", async () => {
    const response = await request(app)
    .post("/api/auth")
    .send({
        email,
        password: "IncorrectPassword123"
    }).expect(400);
});

test("Should login with valid details", async () => {
    const response = await request(app)
    .post("/api/auth")
    .send({
        email,
        password
    }).expect(200);
});

afterAll(async () => {
    //Deletes test account from database
    const response = await request(app).post("/api/auth").send({email,password});
    // await User.findByIdAndDelete(response.text);
    console.log("DELETING USER: " + response.text); // Temporary code.
    uID = mongoose.Types.ObjectId(response.text);   // Line above not
    console.log("UID: " + uID);                     // properly deleting
});