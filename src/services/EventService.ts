import eventModel from "../model/Event";
import typeModel from "../model/TypeEvent";
import ticketModel from "../model/EventTicket";

class EventService {
  async listByCreator(creator: string) {
    const events = await eventModel
      .find({ creator })
      .populate("creator")
      .exec()
      .catch((err) => {
        throw new Error("Empresa não encontrada");
      });

    if (!events.length) {
      throw new Error("Empresa não possui nenhum evento cadastrado");
    }

    return events;
  }

  async listAll() {
    const events = await eventModel.find().catch((err) => {
      throw new Error("Algo deu errado! Tente novamente mais tarde!");
    });

    return events;
  }

  async listByType(type_name: string) {
    const type = await typeModel.findOne({ name: type_name }).catch((err) => {
      throw new Error("Algo deu errado! Tente novamente mais tarde!");
    });

    if (!type) {
      throw new Error(`Não há nenhum tipo com o nome de ${type_name}`);
    }

    const events = await eventModel
      .find({ type: type.id })
      .populate("type")
      .exec()
      .catch((err) => {
        throw new Error("Este tipo de evento não existe");
      });

    if (!events.length) {
      throw new Error(`Não há nenhum evento do tipo: ${type_name}`);
    }

    return events;
  }

  async createTypes(name: string) {
    const nameExists = await typeModel.findOne({ name });
    if (nameExists) {
      throw new Error("Este tipo de evento já existe");
    }

    const type = new typeModel({ name });
    type.save();

    return type;
  }

  async getAllTypes() {
    const types = await typeModel.find();
    if (!types) {
      throw new Error("Não há nenhum tipo de evento cadastrado");
    }
    return types;
  }

  async topEvents() {
    const events = await ticketModel.aggregate([
      {
        $group: {
          _id: "$event_receiver",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $lookup: {
          from: "events",
          localField: "_id",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $limit: 5,
      },
    ]);

    return events;
  }

  async getEventById(id: string) {
    const event = await eventModel
      .findById(id)
      .populate("creator")
      .populate("type")
      .catch((err) => {
        throw new Error("Algo deu errado! Tente novamente mais tarde!");
      });
    if (!event) {
      throw new Error("Evento não encontrado!!");
    }
    return event;
  }
}

export default new EventService();
