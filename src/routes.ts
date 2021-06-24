import { Router } from "express";
import { CreateClientController } from "./controllers/CreateClientController";
import { CreateCompanyController } from "./controllers/CreateCompanyController";
import { CollectionPointController } from "./controllers/CreateCollectionPointController";

const router = Router();

const createClientController = new CreateClientController();
const createCompanyController = new CreateCompanyController();
const createCollectionPointController = new CollectionPointController();

router.post("/clients", createClientController.handle);
router.post("/companies", createCompanyController.handle);
router.post("/points", createCollectionPointController.handle);

export { router };