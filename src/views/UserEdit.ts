/*
 * UserEdit Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { View } from '../../framework/views/View';
import { User, UserProps } from '../models/User';
import { UserShow } from './UserShow';
import { UserForm } from './UserForm';

/*
 * The UserEdit class is a View module child, and it implements the
 * region views, it serves as a parent view for UserForm and UserShow
 * classes.
 * The way it implements the regions feature of the View module is by
 * implementing its own regionsMap() and returning an object with the
 * necessary data to query for the elements where to append the HTML
 * elements. Those elements are also defined on the template() method.
 * Finally all those elements are added to the HTML element on the
 * onRender() method.
 */
export class UserEdit extends View<User, UserProps> {
  /*
   * This is the only implementation of the regionsMap() method that the
   * View class provides as a way to query for specific HTML elements and
   * attatch to them some HTML elements. Those elements are first defined
   * on the template() method with specific class tags which then are
   * being specified here.
   * The object returned by the regionsMap() method follows the
   * {name-of-the-region: region-key-to-query-on-HTML} format.
   */
  regionsMap(): { [regionName: string]: string } {
    return {
      userShow: '.user-show',
      userForm: '.user-form'
    };
  }

  /*
   * As the onRender() method is called before the final state of the View
   * template HTML element is appended to the parent HTML on the render()
   * method we use it to map the regions specified by the regionsMap()
   * method and attach the to the parent element through the View's regions
   * attribute.
   */
  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }

  /*
   * The template() method is used to define the <div> which will contain the
   * child Elements of the UserShow and UserForm classes. Each <div> has a
   * specific identifier, which will then be used on the regionsMap() method
   * to target them.
   */
  template(): string {
    return `
    <br>
    <div class="user-show"></div>
    <br>
    <div class="user-form"></div>
    <br>`;
  }
}
