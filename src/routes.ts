import { Router } from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { CreateCompanyController } from "./controllers/CreateCompanyController";
import { CreateCollectionPointController } from "./controllers/CreateCollectionPointController";

import { GetClientController } from "./controllers/GetClientController";
import { GetCompanyController } from "./controllers/GetCompanyController";
import { GetCollectionPointController } from "./controllers/GetCollectionPointsController";

import { ClientAuthenticateController } from "./controllers/ClientAuthenticateController";
import { CompanyAuthenticateController } from "./controllers/CompanyAuthenticateController";
import { CollectionPointAuthenticateController } from "./controllers/CollectionPointAuthenticateController";

import { ensureClientAuthenticated } from "./middlewares/ensureClientAuthenticated";
import { ensureCompanyAuthenticated } from "./middlewares/ensureCompanyAuthenticate";
import { ensureCollectionPointAuthenticated } from "./middlewares/ensureCollectionPointAuthenticated";

const router = Router();

const createClientController = new CreateClientController();
const createCompanyController = new CreateCompanyController();
const createCollectionPointController = new CreateCollectionPointController();

const getClientController = new GetClientController();
const getCompanyController = new GetCompanyController();
const getCollectionPointController = new GetCollectionPointController();

const clientAuthenticateController = new ClientAuthenticateController();
const companyAuthenticateController = new CompanyAuthenticateController();
const collectionPointAuthenticateController = new CollectionPointAuthenticateController();

router.get("/clients", ensureClientAuthenticated, getClientController.handle);
router.post("/clients/create", createClientController.handle);
router.post("/clients/login", clientAuthenticateController.handle);

router.get("/companies", ensureCompanyAuthenticated, getCompanyController.handle);
router.post("/companies/create", createCompanyController.handle);
router.post("/companies/login", companyAuthenticateController.handle);

router.get("/points", ensureCollectionPointAuthenticated, getCollectionPointController.handle);
router.post("/points/create", createCollectionPointController.handle);
router.post("/points/login", collectionPointAuthenticateController.handle);

export { router };