const dotenv = require("dotenv");
const typeChecker = require("../typeChecker");

dotenv.config({ path: ".env.production.local" });
dotenv.config({ path: ".env.production" });
dotenv.config({ path: ".env.local" });
dotenv.config({ path: ".env" });

typeChecker.valid("REACT_APP_SERVER_HOST", "string");
