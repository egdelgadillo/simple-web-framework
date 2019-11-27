/*
 * UserList Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { CollectionView } from '../../framework/views/CollectionView';
import { User, UserProps } from '../models/User';
import { Model } from '../../framework/models/Model';

/*
 * The UserList class only implementation of the CollectionView from which
 * it inherits its functionality. It defines its own implementation of the
 * renderItem() and template() methods.
 */
export class UserList extends CollectionView<User, UserProps> {
  /*
   * The renderItem() method is in charge of rendering each individual Model instance's
   * data from the Collection. We're not returning any value as we are defining the
   * HTML elements right on the spot, which are child elements of the parent element
   * required as an argument. We then query on that element for the desired identifier
   * defined on the template() method and attach to it the desired Model's data.
   */
  renderItem(model: Model<UserProps>, parent: DocumentFragment): void {
    const list = parent.querySelector('ul');
    const name = model.get('name');

    if (list && name) {
      list.innerHTML += `<li>${name}</li>`;
    }
  }

  /*
   * In here we are defining the HTML structure and elements necessary to render
   * each of the desired Model's data, in this case as a ist, which will later be
   * used or targeted by the renderItem() method.
   */
  template(): string {
    return `
    <h1>User List</h1>
    <ul></ul>
    <br>
    `;
  }
}
