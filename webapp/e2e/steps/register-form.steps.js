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
    });

    then("The user is redirected to a login from the provider", async () => {
      /*await expect(page).toMatch("Login")
      await expect(page).toMatch("Username")
      await expect(page).toMatch("Password")*/
    });
  });

    test("Login as a new user", ({given,when,then}) => {
    
        let username;
        let password;
    
        given("An registered user", () => {
          username = "radarinen1btesting"
          password = "Elpoddefabio1!"
        });
    
        when("The user wants to get a pod", async () => {
            await expect(page).toClick('button', { text: 'Log In / Register' })
            await expect(page).toClick('button', { text: 'Register for a SOLID POD' })
        });
    
        then("The user is redirected to a register from the provider", async () => {
            await expect(page).toMatch("Register")
        });
    });

});
