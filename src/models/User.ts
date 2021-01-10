/*
 * User Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { Model } from '../../framework/models/Model';
import { Attributes } from '../../framework/models/Attributes';
import { ApiSync } from '../../framework/models/ApiSync';
import { Eventing } from '../../framework/models/Eventing';
import { Collection } from '../../framework/models/Collection';

/*
 * The UserProps interface is used to define the object properties each
 * User instance will have. This is very widely used to take advantage
 * of TypeScript's static type and error checking throughout the app.
 */
export interface UserProps {
  name?: string;
  age?: number;
  id?: number;
}

/*
 * The rootUtl property is defined by the developer which points to the
 * RESTful API address from where to extract the User Model data. This
 * particular address must point to a RESTful API that follows the
 * RESTful APIs Conventions.
 * Currently the address is pointing to the json-server address.
 */
const rootUrl = 'http://localhost:3000/users';

/*
 * The User class is an implementation of the framework's model class, in fact
 * it extends it. In this case inheritance was chosen over composition in order
 * to facilitate the calls to the Model's specific modules methods.
 * It implements two static methods which are used to simplify the creation of
 * new User instances without having the need to specify each instance of the
 * modules required by the Model or Collection classes.
 * It also provides a User class' specific method, setRandomAge() which will be
 * used on the views.
 */
export class User extends Model<UserProps> {
  /*
   * The buildUser() static method provides an easy way to start a new User
   * instance without having to write all the Model class dependencies. It
   * then returns the new instance of the created User.
   * In this case it provides instances of the Attributes, Eventing and ApiSync
   * modules, which can easily be swapped thanks to the Model composition design,
   * as long as they follow the interfaces constraints required by the Model class.
   */
  static buildUser(attrs: UserProps): User {
    return new User(
      new Attributes<UserProps>(attrs),
      new Eventing(),
      new ApiSync<UserProps>(rootUrl)
    );
  }

  /*
   * The buildUserCollection() static method provides an easy way to start a
   * new User Collection instance without having to write all the Collection
   * class dependencies. It then returns the new instance of the created
   * Collection.
   * This buildUserCollection() static method provides the new Collection class
   * with a way to deserialize each Collection model and create a new instance of
   * User with them using the handy buildUser() static method whenever the
   * Collection's fetch() method is called.
   */
  static buildUserCollection(): Collection<User, UserProps> {
    return new Collection<User, UserProps>(rootUrl, (json: UserProps) =>
      User.buildUser(json)
    );
  }

  /*
   * setRandomAge is a helper function related to the User model which just
   * sets a new random age to the User instance and saves it. This method is
   * used on the view implementation.
   */
  setRandomAge(): void {
    this.set({ age: Math.floor(Math.random() * Math.floor(100)) });
  }
}
