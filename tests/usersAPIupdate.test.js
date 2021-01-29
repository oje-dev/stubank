const request = require("supertest");
const User = require("../models/User");
const app = require("../app");
const mongoose = require('mongoose');
const { TestScheduler } = require("jest");

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
const email = "testusersupdate@test.com";
const password = "test123";
const password2 = "test123";

var token;
beforeAll(async () => {
    let response = await request(app)
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
    });
    //Stores authentication token
    token = response.body.token;

    //Gets user object with original details
    const response = await request(app).post("/api/auth").send({email,password});
    const originalUser = await User.findById(response.text);
});

test("Should update firstname", async () => {
    let response = await request(app)
    .post("/api/users/update")
    .set("x-auth-token",token)
    .send({
        firstname: "NewName"
    }).expect(200);

    let response = await request(app).post("/api/auth").send({email,password});
    const updatedUser = await User.findById(response.text);

    //Checks that firstname has been updated
    expect(originalUser.firstname).not.toEqual(updatedUser.firstname);
});

test("Should update password", async () => {
    let response = await request(app)
    .post("/api/users/update")
    .set("x-auth-token",token)
    .send({
        password: "NewPassword"
    }).expect(200);

    let response = await request(app).post("/api/auth").send({email,password});
    const updatedUser = await User.findById(response.text);

    //Checks that password has been updated
    expect(originalUser.password).not.toEqual(updatedUser.password);

});

afterAll(async () => {
    //Deletes test account from database
    let response = await request(app).post("/api/auth").send({email,password});
    await User.findByIdAndDelete(response.text);
    console.log("DELETING USER: " + response.text); // Temporary code.
    uID = mongoose.Types.ObjectId(response.text);   // Line above not
    console.log("UID: " + uID);                     // properly deleting

});