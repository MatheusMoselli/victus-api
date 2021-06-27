import { Router } from "express";

// Validations
import { ensureUserAuthenticated } from "./middlewares/ensureUserAuthenticated";
import { ensureCompanyAuthenticated } from "./middlewares/ensureCompanyAuthenticate";
import { ensureCollectionPointAuthenticated } from "./middlewares/ensureCollectionPointAuthenticated";

// Controllers
import { UserCreateController } from "./controllers/UserCreateController";
import { UserAuthenticateController } from "./controllers/UserAuthenticateController";
import { UserGetController } from "./controllers/UserGetController";
const userCreateController = new UserCreateController();
const userAuthenticateController = new UserAuthenticateController();
const userGetController = new UserGetController();

import { CompanyCreateController } from "./controllers/CompanyCreateController";
import { CompanyAuthenticateController } from "./controllers/CompanyAuthenticateController";
import { CompanyGetController } from "./controllers/CompanyGetController";
const companyCreateController = new CompanyCreateController();
const companyAuthenticateController = new CompanyAuthenticateController();
const companyGetController = new CompanyGetController();

import { CollectionPointCreateController } from "./controllers/CollectionPointCreateController";
import { CollectionPointAuthenticateController } from "./controllers/CollectionPointAuthenticateController";
import { CollectionPointGetController } from "./controllers/CollectionPointsGetController";
const collectionPointCreateController = new CollectionPointCreateController();
const collectionPointAuthenticateController = new CollectionPointAuthenticateController();
const collectionPointGetController = new CollectionPointGetController();

const router = Router();

// Routes
router.get("/user", ensureUserAuthenticated, userGetController.handle);
router.post("/user/create", userCreateController.handle);
router.post("/user/login", userAuthenticateController.handle);

router.get("/company", ensureCompanyAuthenticated, companyGetController.handle);
router.post("/company/create", companyCreateController.handle);
router.post("/company/login", companyAuthenticateController.handle);

router.get("/point", ensureCollectionPointAuthenticated, collectionPointGetController.handle);
router.post("/point/create", collectionPointCreateController.handle);
router.post("/point/login", collectionPointAuthenticateController.handle);

export { router };