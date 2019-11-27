/*
 * UserForm Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { User, UserProps } from '../models/User';
import { View } from '../../framework/views/View';

/*
 * The UserForm class is another implementation of the View class, from
 * which it inherits the attributes and methods. It uses the Eventing
 * methods provided by the View class to map events to the browser and
 * bind data from the client to the RESTful API.
 * It also has some helper methods which are also called when each specific
 * event is triggered.
 */
export class UserForm extends View<User, UserProps> {
  /*
   * The eventsMap() method is redefined here to bind some Model operations
   * on the browser right to the helper methods defined on the UserForm
   * class.
   * We return an object with key:value pairs, one for each event we want to
   * bind to and its corresponding callback function. The key on the returned
   * object has a special format in where we define a
   * "javascript-event-name:html-element-selector" format. The value for each
   * pair is the function to call for that event and for that specific element.
   *
   * For example:
   * In this case we are defining that for the element with an id of 'name'
   * (which is a button) and for an event called 'click' we will call the
   * setName() method.
   */
  eventsMap(): { [key: string]: () => void } {
    return {
      'click:#name': this.setName,
      'click:#random-age-button': this.onButtonClick,
      'click:#save-button': this.saveUser
    };
  }

  /*
   * Here we return the html-style string template in where will also be
   * defined the elements and their identifiers we are targeting on the
   * eventsMap() method.
   * As we are returning a template string from the UserForm we can use the
   * ES6 syntax and bind data directly to the HTML through the Model's get()
   * method.
   */
  template(): string {
    return `
    <br>
    <input id="name-input" placeholder="${this.model.get('name')}">
    <button id="name">Update Name</button>
    <br>
    <button id="random-age-button">Set Random Age</button>
    <br>
    <button id="save-button">Save</button>
    <br>
    `;
  }

  /*
   * A helper method used to change the name of the Model's data through the
   * Attributes' set() method. We obtain the data from the HTML elements
   * simply by running a querySelector() on the desired HTML element and
   * extracting its value. We then use that as an argument to the set()
   * method. Once it is finished the set() method triggers a 'change' event
   * which is caught by the View class constructor, which then calls the render()
   * method, thus refreshing the HTML elements with the new data recently
   * changed.
   */
  setName = (): void => {
    const input = this.parent.querySelector('input');
    if (input) {
      this.model.set({ name: input.value });
    }
  };

  /*
   * The onButtonClick is a helper method which is called when the "Set Random
   * Age" button is clicked. It calls to the Model's helper method setRandomAge().
   * Once it is finished it calls the set() method and triggers a 'change' event
   * which is caught by the View class constructor, which then calls the render()
   * method, thus refreshing the HTML elements with the new data recently
   * changed.
   */
  onButtonClick = (): void => {
    this.model.setRandomAge();
  };

  /*
   * The saveUser() method is used to make the Model's data attributes and / or
   * changes persist on the RESTful API provider.
   * It simply calls the Model's save method().
   */
  saveUser = (): void => {
    this.model.save();
  };
}
