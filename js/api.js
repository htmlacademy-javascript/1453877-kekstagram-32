import { ErrorMessages, UrlRoutes, Method } from './const';

const load = (route, errorText, method = Method.GET, body = null) =>
  fetch(`${UrlRoutes.BASE}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });

export const getData = () => load(UrlRoutes.GET_DATA, ErrorMessages.GET_DATA_ERROR);
export const sendData = (body) => load(UrlRoutes.SEND_DATA, ErrorMessages.SEND_DATA_ERROR, Method.POST, body);

