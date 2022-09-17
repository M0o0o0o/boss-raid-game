function errorHandler(error, req, res, next) {
  console.log("\x1b[33m%s\x1b[0m", error.stack);
  const errorMessage = {
    error: {
      message: error.message,
    },
  };
  if (error.name) {
    errorMessage.error.field = error.name;
  }
  if (error.name == "SyntaxError") {
    errorMessage.error.message = "잘못된 JSON 형식입니다.";
  }
  if (res.statusCode < 400) {
    res.status(400);
  }
  res.json(errorMessage);
}

module.exports = errorHandler;
