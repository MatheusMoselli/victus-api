import { Router } from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { CreateCompanyController } from "./controllers/CreateCompanyController";
import { CollectionPointController } from "./controllers/CreateCollectionPointController";
import { GetClientController } from "./controllers/GetClientController";
import { ListCompaniesController } from "./controllers/ListCompaniesController";
import { ListCollectionPointsController } from "./controllers/ListCollectionPointsController";
import { ClientAuthenticateController } from "./controllers/ClientAuthenticateController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";

const router = Router();

const createClientController = new CreateClientController();
const createCompanyController = new CreateCompanyController();
const createCollectionPointController = new CollectionPointController();
const getClientController = new GetClientController();
const listCompaniesController = new ListCompaniesController();
const listCollectionPointsController = new ListCollectionPointsController();
const clientAuthenticateController = new ClientAuthenticateController();

router.get("/clients", ensureAuthenticated, getClientController.handle);
router.post("/clients/create", createClientController.handle);
router.post("/clients/login", clientAuthenticateController.handle);

router.get("/companies", listCompaniesController.handle);
router.post("/companies/create", createCompanyController.handle);

router.get("/points", listCollectionPointsController.handle);
router.post("/points/create", createCollectionPointController.handle);

export { router };