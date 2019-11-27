/*
 * index.ts - App Entry Point
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { User } from './models/User';
import { UserEdit } from './views/UserEdit';
import { UserList } from './views/UserList';

/*
 * A comment on the index.html file
 *
 * Each <div> tag is a View class or CollecionView class implementation
 * Therefore we mark each div's borders in order to be able to differentiate
 * them from one another.
 */

/*
 * We instantiate a new user with a known identifier. This means that
 * the Model's data will reside on the database and will have to be
 * fetched.
 */
const user = User.buildUser({ id: 2 });
user.fetch();

/*
 * We define a new implementation of the UserList class, which will render data
 * from the UserCollection. We then call on the render() method to start the
 * processing of each Model's data and HTML elements.
 */
const listElement = document.getElementById('user-list');
if (listElement) {
  new UserList(listElement, User.buildUserCollection()).render();
}

/*
 * We define a new implementation of the USerEdit class which will also render
 * its child classes, UserForm and UserShow classes. We then call the render() method
 * which will start the Model's data processing and HTML elements rendered on the
 * browser.
 */
const rootElement = document.getElementById('root');
if (rootElement) {
  new UserEdit(rootElement, user).render();
}
