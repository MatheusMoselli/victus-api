import { EntityRepository, Repository } from 'typeorm';
import { Company } from "../entities/Company";


@EntityRepository(Company)
class CompanyRepository extends  Repository<Company> {}

export { CompanyRepository };