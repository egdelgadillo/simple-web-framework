/*
 * ApiSync Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import Axios, { AxiosPromise } from 'axios';

/*
 * Required interface to be able to make the ApiSync object as Generic
 * due to the required use of the id property on the data variable on
 * the fetch() method.
 * The same interface can be seen on the Model.ts Module.
 */
interface HasId {
  id?: number;
}

/*
 * This class handles the calls to an external RESTful API.
 * It provides two methods: The fetch() method which executes
 * a GET request and the save() method which either executes
 * a PUT or a POST request, depending on if the data already
 * exists or should be created
 * It depends on the Axios module to make the HTTP requests
 * and on the Axios type definitions
 */
export class ApiSync<T extends HasId> {
  constructor(private url: string) {}

  /*
   * Makes a GET request in order to fetch some data
   */
  fetch(id: number): AxiosPromise<T> {
    return Axios.get(`${this.url}/${id}`);
  }

  /*
   * Makes a PUT request if the resource already exists.
   * If that is not the case makes a POST request to create
   * a new resource
   */
  save(data: T): AxiosPromise {
    const { id } = data;
    if (id) {
      return Axios.put(`${this.url}/${id}`, data);
    } else {
      return Axios.post(this.url, data);
    }
  }
}
