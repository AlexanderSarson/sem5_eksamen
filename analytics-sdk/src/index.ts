import axios from 'axios';

export function reloadAnalytics(config: object) {
  return {
    create: async (event: object) => {
      let response;
      try {
        // response = await fetch(`${server}/api/events`, {
        //   method: 'POST',
        //   body: JSON.stringify(event),
        // });
        response = await axios({
          method: 'POST',
          headers: { 'Access-Control-Allow-Origin': '*' },
          url: `${config.server}/api/events`,
          data: event,
        });
      } catch (error) {
        return error;
      }
      return response.data;
    },
  }
}

export const all = async (server: string) => {
  let response;
  try {
    response = await axios({
      method: 'GET',
      url: `${server}/api/events/all`,
    });
  } catch (error) {
    return error;
  }

  return response.data;
};

export const create = async (server: string, event: object) => {
  let response;
  try {
    // response = await fetch(`${server}/api/events`, {
    //   method: 'POST',
    //   body: JSON.stringify(event),
    // });
    response = await axios({
      method: 'POST',
      headers: { 'Access-Control-Allow-Origin': '*' },
      url: `${server}/api/events`,
      data: event,
    });
  } catch (error) {
    return error;
  }
  return response.data;
};

export const findOne = async (server: string, entityId: string) => {
  let response;
  try {
    response = await axios({
      method: 'GET',
      url: `${server}/api/events/${entityId}`,
    });
  } catch (error) {
    return error;
  }
  return response.data;
};
