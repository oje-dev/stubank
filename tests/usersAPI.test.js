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
const email = "testusers@test.com";
const password = "test123";
const password2 = "test123";

test("Shouldn't create new account with no details", async () => {
    const response = await request(app)
    .post("/api/users")
    .send()
    .expect(400);
});

var token; //Stores auth token
test("Should create new account", async () => {
    const response = await request(app)
    .post("/api/users")
    .send({
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
    .expect(200);
    token = response.body.token;
});

test("Shouldn't create new with existing email", async () => {
    const response = await request(app)
    .post("/api/users")
    .send({
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
    .expect(400);
});

test("Shouldn't create account when password is too short", async () => {
    const response = await request(app)
    .post("/api/users")
    .send({
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
        password: "123",
        password2: "123"
    })
    .expect(400);
});

test("Shouldn't create account when password is too long", async () => {
    const response = await request(app)
    .post("/api/users")
    .send({
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
        password: "thispasswordisoverthetwentycharacterlimit",
        password2: "thispasswordisoverthetwentycharacterlimit"
    })
    .expect(400);
});

test("Shouldn't create account with invalid email", async () => {
    const response = await request(app)
    .post("/api/users")
    .send({
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
        email: "invalidemail.com",
        password,
        password2
    })
    .expect(400);
});

test("Shouldn't create account with invalid phonenumber", async () => {
    const response = await request(app)
    .post("/api/users")
    .send({
        title,
        firstname,
        lastname,
        phoneno: "notanumber",
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
    .expect(400);
});

afterAll(async () => {
    //Deletes test account from database
    const response = await request(app).post("/api/auth").send({email,password});
    //await User.findByIdAndDelete(response.text);
    console.log("DELETING USER: " + response.text); // Temporary code.
    uID = mongoose.Types.ObjectId(response.text);   // Line above not
    console.log("UID: " + uID);                     // properly deleting

});