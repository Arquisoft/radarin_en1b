const request = require("supertest");
const server = require("./server-for-tests");

/**
 * Connect to a new in-memory database before running any tests.
 */
beforeAll(async () => {
    await server.startdb();
    const app = await server.startserver();
});

/**
 * Clear all test data after every test.
 */
afterEach(async () => await server.clearDatabase());

/**
 * Remove and close the db and server.
 */
afterAll(async () => {
    await server.closeServer(); //finish the server
    await server.closeDB();
})

/**
 * Product test suite.
 */
describe("user ", () => {
    /**
     * Tests that a user can be created without any error.
     */
    it("can be created correctly", async () => {
        const webId = "webId";
        const location = [-5.66152, 43.53573];
        const banned = false;
        const response = await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
        expect(response.body.location.coordinates).toStrictEqual(location);
        expect(response.body.banned).toBe(banned);
    });

    /**
     * Tests that a location can be modified without any error.
     */
    it("can be modified correctly (location)", async () => {
        const webId = "webId";
        const location = [-5.66152, 43.53573];
        const banned = false;
        await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        const newLocation = [0.0, 0.0];
        const response = await request(app).post("/api/users/add").send({webId: webId,location: newLocation,banned: banned}).set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
        expect(response.body.location.coordinates).toStrictEqual(newLocation);
        expect(response.body.banned).toBe(banned);
    });

    /**
     * Tests that a banned can be modified without any error.
     */
    it("can be modified correctly (banned)", async () => {
        const webId = "webId";
        const location = [-5.66152, 43.53573];
        const banned = false;
        await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        const newBanned = true;
        const response = await request(app).post("/api/users/add").send({webId: webId,location: location,banned: newBanned}).set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.webId).toBe(webId);
        expect(response.body.location.coordinates).toStrictEqual(location);
        expect(response.body.banned).toBe(newBanned);
    });

    /**
     * Test that we can find near friends without any error.
     */
    it("can be found correctly (zero)",async () => {
        const location = [-5.66152, 43.53573];
        const friends = ["webId1", "webId2"];
        const response = await request(app).post("/api/users/list").send({location: location,friends: friends}).set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });
    it("can be found correctly (one)",async () => {
        await request(app).post("/api/users/add").send({webId: "webId1",location: [-5.673, 43.53573],banned: false}).set("Accept", "application/json"); // 925.7 m
        await request(app).post("/api/users/add").send({webId: "webId2",location: [-5.674, 43.53573],banned: false}).set("Accept", "application/json"); // 1006.3 m
        
        const location = [-5.66152, 43.53573];
        const friends = ["webId1", "webId2"];
        const response = await request(app).post("/api/users/list").send({location: location,friends: friends}).set("Accept", "application/json"); // 0-1000 m
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].webId).toBe("webId1");
        expect(response.body[0].location.coordinates).toStrictEqual([-5.673, 43.53573]);
        expect(response.body[0].banned).toBe(false);
    });
    it("can be found correctly (one to zero - location)",async () => {
        await request(app).post("/api/users/add").send({webId: "webId1",location: [-5.673, 43.53573],banned: false}).set("Accept", "application/json"); // 925.7 m
        await request(app).post("/api/users/add").send({webId: "webId2",location: [-5.674, 43.53573],banned: false}).set("Accept", "application/json"); // 1006.3 m
        await request(app).post("/api/users/add").send({webId: "webId1",location: [-5.675, 43.53573],banned: false}).set("Accept", "application/json"); // 1086.9 m
        
        const location = [-5.66152, 43.53573];
        const friends = ["webId1", "webId2"];
        const response = await request(app).post("/api/users/list").send({location: location,friends: friends}).set("Accept", "application/json"); // 0-1000 m
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });
    it("can be found correctly (one to zero - banned)",async () => {
        await request(app).post("/api/users/add").send({webId: "webId1",location: [-5.673, 43.53573],banned: false}).set("Accept", "application/json"); // 925.7 m
        await request(app).post("/api/users/add").send({webId: "webId2",location: [-5.674, 43.53573],banned: false}).set("Accept", "application/json"); // 1006.3 m
        await request(app).post("/api/users/add").send({webId: "webId1",location: [-5.673, 43.53573],banned: true}).set("Accept", "application/json"); // 925.7 m
        
        const location = [-5.66152, 43.53573];
        const friends = ["webId1", "webId2"];
        const response = await request(app).post("/api/users/list").send({location: location,friends: friends}).set("Accept", "application/json"); // 0-1000 m
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });

    /**
     * Test that we can check if admin without any error.
     */
    it("can be checked correctly (no admin)",async () => {
        const webId = "webId";
        const location = [-5.66152, 43.53573];
        const banned = false;
        await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        const response = await request(app).post("/api/users/admin").send({webId: webId}).set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(false);
    });
    it("can be checked correctly (admin)",async () => {
        const webId = "https://asw2021en1b.inrupt.net/profile/card#me";
        const location = [-5.66152, 43.53573];
        const banned = false;
        await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        const response = await request(app).post("/api/users/admin").send({webId: webId}).set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
    });

    /**
     * Test that we can check if banned without any error.
     */
     it("can be checked correctly (no banned)",async () => {
        const webId = "webId";
        const location = [-5.66152, 43.53573];
        const banned = false;
        await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        const response = await request(app).post("/api/users/banned").send({webId: webId}).set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(false);
    });
    it("can be checked correctly (admin)",async () => {
        const webId = "webId";
        const location = [-5.66152, 43.53573];
        const banned = true;
        await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        const response = await request(app).post("/api/users/banned").send({webId: webId}).set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toBe(true);
    });

    /**
     * Test that we can get normal users without any error.
     */
     it("can be got correctly (no normal)",async () => {
        const webId = "https://asw2021en1b.inrupt.net/profile/card#me";
        const location = [-5.66152, 43.53573];
        const banned = false;
        await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        const response = await request(app).get("/api/users/normal").set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(0);
    });
    it("can be got correctly (normal)",async () => {
        const webId = "webId";
        const location = [-5.66152, 43.53573];
        const banned = false;
        await request(app).post("/api/users/add").send({webId: webId,location: location,banned: banned}).set("Accept", "application/json");
        
        const response = await request(app).get("/api/users/normal").set("Accept", "application/json");
        
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBe(1);
    });
});