const { rejects, fail } = require("assert");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const https = require("https");
const { resolve } = require("path");
const Category_Collection = require("./models/database").categories;
const Item_Collection = require("./models/database").Items;
const UserCollection = require("./models/database").Users;
const authmiddleware = require("./middleware/authmiddleware");
const authroutes = require("./authroutes/authroutes");
const { v4 } = require("uuid");
const { request } = require("http");
const { response } = require("express");
const uuid = require("uuid").v4;
const cookie_parser = require("cookie-parser");
const { totalmem } = require("os");


