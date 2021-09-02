import eventModel from "../model/Event";
import typeModel from "../model/TypeEvent";
class EventService {
  async listByCreator(creator: string) {
    const events = await eventModel
      .find({ creator })
      .populate("creator")
      .exec()
      .catch((err) => {
        throw new Error("this company doesn't exists");
      });

    if (!events.length) {
      throw new Error("this company doesn't have events yet");
    }

    return events;
  }

  async listAll() {
    const events = await eventModel.find().catch((err) => {
      throw new Error("Server internal error");
    });

    return events;
  }

  async listByType(type_name: string) {
    const type = await typeModel.findOne({ name: type_name }).catch((err) => {
      throw new Error("internal server error");
    });

    if (!type) {
      throw new Error(`there is no type named ${type_name}`);
    }

    const events = await eventModel
      .find({ type: type.id })
      .populate("type")
      .exec()
      .catch((err) => {
        throw new Error("this event type doesn't exists");
      });

    if (!events.length) {
      throw new Error(`there is no event with type ${type_name}`);
    }

    return events;
  }

  async createTypes(name: string) {
    const nameExists = await typeModel.findOne({ name });
    if (nameExists) {
      throw new Error("Type already exists");
    }

    const type = new typeModel({ name });
    type.save();

    return type;
  }

  async getAllTypes() {
    const types = await typeModel.find();
    if (!types) {
      throw new Error("There aren't any types");
    }
    return types;
  }
}

export default new EventService();
