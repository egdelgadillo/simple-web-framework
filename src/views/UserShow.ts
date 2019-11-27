/*
 * UserShow Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { View } from '../../framework/views/View';
import { User, UserProps } from '../models/User';

/*
 * The UserShow class is the simplest of all the View class implementations.
 * It only redners an HTML template which will be used to show the current
 * User Model's data. It acts as a child of the UserEdit class.
 */
export class UserShow extends View<User, UserProps> {
  /*
   * Here we return the HTML-style string template which will later be converted
   * and attatched to the parent's HTML element as a UserShow element.
   * As we are returning a template string we can use the ES6 syntax and bind
   * data directly to the HTML through the Model's get() method.
   */
  template(): string {
    return `
    <h3>User Detail</h3>
    name: ${this.model.get('name')}
    <br>
    age: ${this.model.get('age')}
    <br>
    <br>
    `;
  }
}
