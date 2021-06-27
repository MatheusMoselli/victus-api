import userModel from "../model/User";

class UserGetService {
  async execute(id: string) {
    const user = await userModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    };

    return user;
  }
}

export { UserGetService };