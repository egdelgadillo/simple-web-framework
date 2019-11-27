/*
 * Collection Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { Eventing } from './Eventing';
import Axios, { AxiosResponse } from 'axios';

/*
 * The Collection class is a Generic collection of Models. It handles
 * the assignment of Model instances to a predefined Model array type
 * attribute. The assignment is made by the fetch() method which calls
 * to a RESTful API, obtains the JSON data and by parsing it. They are
 * assigned to the class' model attribute.
 * It depends on the Eventing module to trigger a 'change' event each
 * time the data is fetched and on the Axios module and its type to make
 * the HTTP request to the RESTful API.
 */
export class Collection<T, K> {
  model: T[] = [];
  events: Eventing = new Eventing();

  /*
   * The constructor is the responsible for setting the rootUrl attribute
   * and receiving the deserialize dependency which parses the retrieved
   * JSON data onto a type T Object.
   */
  constructor(public rootUrl: string, public deserialize: (json: K) => T) {}

  /*
   * The fetch() method is the one which retrieves the data from the REST
   * service, then parses it with the deserialize() function and pushes it
   * to the type T model attribute as a new array item.
   * Then it triggers a 'change' event to tell the other listeners new data
   * was added.
   */
  fetch(): void {
    Axios.get(this.rootUrl).then((response: AxiosResponse) => {
      response.data.forEach((value: K) => {
        this.model.push(this.deserialize(value));
      });
      this.trigger('change');
    });
  }

  /*
   * Getter for the Eventing Module on() method. This follows a composition-style
   * concept as it delegates all the Eventing-specific tasks to the Eventing instance
   * saved on the Class.
   */
  get on() {
    return this.events.on;
  }

  /*
   * Getter for the Eventing Module trigger() method. This follows a composition-style
   * concept as it delegates all the Eventing-specific tasks to the Eventing instance
   * saved on the Class.
   */
  get trigger() {
    return this.events.trigger;
  }
}
