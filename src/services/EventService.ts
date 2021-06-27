import eventModel from "../model/Event";



class EventService {
  async listByCreator(creator: string) {
    const events = await eventModel.find( { creator } ).catch(err => {
      throw new Error("this company doesn't exists");
    });

    if(!events.length) {
      throw new Error("this company doesn't have events yet");
    };

    return events;
  };

  async listAll() {
    const events = await eventModel.find().catch(err => {
      throw new Error("Server internal error");
    });

    return events;
  };
};

export default new EventService();