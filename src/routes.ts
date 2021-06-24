import { Router } from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { CreateCompanyController } from "./controllers/CreateCompanyController";
import { CollectionPointController } from "./controllers/CreateCollectionPointController";
import { ListClientsController } from "./controllers/ListClientsController";
import { ListCompaniesController } from "./controllers/ListCompaniesController";
import { ListCollectionPointsController } from "./controllers/ListCollectionPointsController";

const router = Router();

const createClientController = new CreateClientController();
const createCompanyController = new CreateCompanyController();
const createCollectionPointController = new CollectionPointController();
const listClientsController = new ListClientsController();
const listCompaniesController = new ListCompaniesController();
const listCollectionPointsController = new ListCollectionPointsController();

router.get("/clients", listClientsController.handle);
router.post("/clients/create", createClientController.handle);

router.get("/companies", listCompaniesController.handle);
router.post("/companies/create", createCompanyController.handle);

router.get("/points", listCollectionPointsController.handle);
router.post("/points/create", createCollectionPointController.handle);

export { router };