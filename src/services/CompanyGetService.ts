import companyModal from "../model/Company";

class CompanyGetService {
  async execute(id: string) {
    const company = companyModal.findById(id);
    if (!company) {
      throw new Error("Company not found");
    }

    return company;
  }
}

export { CompanyGetService };