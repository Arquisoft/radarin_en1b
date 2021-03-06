// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

const mockGeolocation = {
    getCurrentPosition: jest.fn()
      .mockImplementationOnce((success) => Promise.resolve(success({
        coords: {
          latitude: 51.1,
          longitude: 45.3
        }
      })))
  };
  global.navigator.geolocation = mockGeolocation;
  
  global.navigator.permissions = {
    query: jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ state: "granted" })),
  };
  
global.navigator.geolocation = mockGeolocation;

