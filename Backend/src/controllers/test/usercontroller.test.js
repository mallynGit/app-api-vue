const { mockRequest, mockResponse } = require("jest-mock-req-res");
const { login } = require("../usercontroller");

test("usuario no existe/fallo el login", async () => {
  const req = {
    body: {
      username: "admin2",
      password: "Miguel1.",
    },
    headers: {
      authorization: null,
    },
  };
  const res = mockResponse();

  await login(req, res);

  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    token: expect.any(String),
  });
});
