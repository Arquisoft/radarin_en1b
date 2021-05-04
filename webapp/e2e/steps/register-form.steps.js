const {defineFeature, loadFeature}=require("jest-cucumber");
const feature = loadFeature("./features/register-form.feature");

defineFeature(feature, (test) => {
  
  beforeEach(async () => {
    await global.page.goto("http://localhost:3000", {timeout: 60000});
  })

  test("Login as an existing user", ({given,when,then}) => {
    
    let username;
    let password;

    given("An registered user", () => {
      username = "radarinen1btesting"
      password = "Elpoddefabio1!"
    });

    when("The user tries to login", async () => {
        await expect(page).toClick('button', { text: 'Log In / Register' })
        await expect(page).toClick('button', { text: 'Log In' })
        await expect(page).toFillForm('form[]', {
            username: username,
            password: password,
          })
          await expect(page).toClick('button', { text: 'Log In' })
    });

    then("A welcome message should be shown", async () => {
      await expect(page).toMatch("Welcome to Radarin Manager!")
      await expect(page).toMatch("You are now logged in")
    });
  });

});
