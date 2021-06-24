import { EntityRepository, Repository } from "typeorm";
import { Client } from "../entities/Client";

@EntityRepository(Client)
class ClientRepository extends Repository<Client> {}

export { ClientRepository };