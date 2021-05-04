const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/register-form.feature");

defineFeature(feature, (test) => {
  
  beforeEach(async () => {
    await global.page.goto("http://localhost:3000")
  })

  test("The user tries to access views where login is needed: Map", ({given,when,then}) => {
    
    let email;
    let username;

    given("An unregistered user", () => {
      email = "none@none.com"
      username = "none"
    });

    when("The user tries to access the map", async () => {
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
 
});
