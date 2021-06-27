import pointModel from "../model/Point";

class CollectionPointGetService {
  async execute(id: string) {
    const point = pointModel.findById(id);
    if (!point) {
      throw new Error("Collection Point not found!");
    }

    return point;
  };
};

export { CollectionPointGetService };