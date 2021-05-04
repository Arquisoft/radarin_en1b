const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/register-form.feature");

defineFeature(feature, (test) => {
  
  beforeEach(async () => {
    await global.page.goto("http://localhost:3000")
  })

  /*
  test("The user is not registered in the site", ({given,when,then}) => {
    
    let email;
    let username;

    given("An unregistered user", () => {
      email = "newuser@test.com"
      username = "newuser"
    });

    when("I fill the data in the form and press submit", async () => {
      await expect(page).toMatch("Hi, ASW students")
      await expect(page).toFillForm("form[name="register"]", {
        username: username,
        email: email,
      })
      await expect(page).toClick("button", { text: "Submit" })
      await expect(page).toMatch("Welcome to ASW")
    });

    then("A welcome message should be shown in the screen", async () => {
    });
  });*/

  test("The user tries to access views where login is needed: Map", ({given,when,then}) => {
    
    let email;
    let username;

    given("An unregistered user", () => {
      email = "none@none.com"
      username = "none"
    });

    when("I try to access the map", async () => {
      await global.page.goto("http://localhost:3000/map")
    });

    then("A message should be shown in the screen", async () => {
      await expect(page).toMatch("You are not logged in!")
      await expect(page).toMatch("To be able to view this you need to be logged in")
    });
  });

  test("The user tries to access views where login is needed: Manage Friends", ({given,when,then}) => {
    
    let email;
    let username;

    given("An unregistered user", () => {
      email = "none@none.com"
      username = "none"
    });

    when("I try to access manage friends", async () => {
      await global.page.goto("http://localhost:3000/friends")
    });

    then("A message should be shown in the screen", async () => {
      await expect(page).toMatch("You are not logged in!")
      await expect(page).toMatch("To be able to view this you need to be logged in")
    });
  });
 
  /*
  test("The user is already registered in the site", ({ given, when, then }) => {
    
    given("An already registered user", () => {
    });

    when("I fill the data in the form and press submit", async () => {
      
    });

    then("An error message should be shown in the screen", async () => {
    });
    
  });*/
});