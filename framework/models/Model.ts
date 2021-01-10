/*
 * Model Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { AxiosResponse, AxiosPromise } from 'axios';

/*
 * The ModelAttributes is a Generic Constraint-type interface used to
 * define the methods an Attributes module should have to be able to
 * work with the Model class.
 * This is used to be able to switch modules if needed from the User
 * class and define new functionality without breaking the said class
 * functionality.
 * It states that any Module which wants to be used as an
 * Attributes module must have get(), set() and getAll() methods.
 */
interface ModelAttributes<T> {
  get<K extends keyof T>(key: K): T[K];
  set(update: T): void;
  getAll(): T;
}

/*
 * The Sync interface is a Generic Constraint-type interface used to
 * define the methods a Data Syncing module should have to be able to
 * work with the Model class.
 * This is used to be able to switch modules if needed from the User
 * class and define new functionality without breaking the said class
 * functionality.
 * It states that any Module which wants to be used as an
 * Sync module must have fetch() and save() methods.
 */
interface Sync<T> {
  fetch(id: number): AxiosPromise<T>;
  save(data: T): AxiosPromise;
}

/*
 * The Events interface is used to define the methods an Eventing module
 * should have to be able to work with the Model class.
 * This is used to be able to switch modules if needed from the User
 * class and define new functionality without breaking the said class
 * functionality.
 * It states that any Module which wants to be used as an
 * Eventing module must have an on() and a trigger() method.
 */
interface Events {
  on(eventName: string, callback: () => void): void;
  trigger(eventName: string): void;
}

/*
 * Required interface to be able to make the Model object as Generic
 * due to the required use of the id property on the data variable on
 * the fetch() method.
 * The same interface can be seen on the ApiSync.ts Module.
 */
type HasId = {
  id?: number;
};

/*
 * The Model class is a very important object as it is used to generate
 * new instances of data models on any implementation of this framework.
 * This is a generic class which enables the developer to create new instances
 * of user-defined models as well as also define which object properties and
 * types the model will have.
 * The Model class follows the composition architecture as it only holds instances
 * of the attributes, events and sync modules and delegates those specific functions
 * to them, which makes it easy to change modules / functionality if needed.
 * The only requirement the model will have is a must-have id property on the
 * instantiated model. This will be used to make the fetch and get requests on
 * the Sync module.
 * It only depends on Axios' type definitions to take advantage of TypeScript's
 * type and error checking.
 */
export class Model<T extends HasId> {
  /*
   * The constructor requires to be given the attributes, events and sync modules
   * instances in order to delegate to them their specific tasks
   */
  constructor(
    private attributes: ModelAttributes<T>,
    private events: Events,
    private sync: Sync<T>
  ) {}

  /*
   * Getter for the Eventing Module on() method. This follows a composition-style
   * concept as it delegates all the Eventing-specific tasks to the Eventing instance
   * saved on the Model Class instance.
   */
  on = this.events.on;

  /*
   * Getter for the Eventing Module trigger() method. This follows a composition-style
   * concept as it delegates all the Eventing-specific tasks to the Eventing instance
   * saved on the Model Class instance.
   */
  trigger = this.events.trigger;

  /*
   * Getter for the Attributes Module get() method. This follows a composition-style
   * concept as it delegates all the Attributes-specific tasks to the Attributes instance
   * saved on the Model Class instance.
   */
  get = this.attributes.get;

  /*
   * Getter-like method for the Attributes Module set() method. This follows a composition-style
   * concept as it delegates all the Attributes-specific tasks to the Attributes instance
   * saved on the Model Class instance.
   * It also the calls the Eventing-specific method trigger() on the Eventing instance,
   * which triggers a 'change' event in order to let the app know that some data
   * has changed.
   */
  set = (update: T) => {
    this.attributes.set(update);
    this.events.trigger('change');
  };

  /*
   * Getter-like method for the Sync Module fetch() method. This follows a
   * composition-style concept as it delegates all the Sync-specific tasks to
   * the Sync instance saved on the Model Class instance.
   * First it attempts to get the value of the id key on the Attributes instance's
   * data. If no id was found means that the user was never saved on the database
   * as an id property is only given automatically by the RESTful API when a new
   * resource has been created. If so then there's no point to attempt to fetch the
   * data from the REST API.
   */
  fetch = () => {
    const id = this.attributes.get('id');
    if (typeof id !== 'number') {
      throw new Error('The specified user has not been previously saved!');
    }

    this.sync.fetch(id).then((response: AxiosResponse): void => {
      this.set(response.data);
    });
  };

  /*
   * Getter-like method for the Sync Module save() method. This follows a
   * composition-style concept as it delegates all the Sync-specific tasks to
   * the Sync instance saved on the Model Class instance.
   * First it gets all the Model's data by utilizing the Attributes instance's
   * getAll() method and then it creates a new resource on the RESTful API utilizing
   * the Sync instance's save() method. If data was successfully saved then a
   * 'save' event is triggered by the Eventing instance.
   */
  save = (): void => {
    this.sync
      .save(this.attributes.getAll())
      .then((response: AxiosResponse): void => {
        this.trigger('save');
      })
      .catch(() => {
        this.trigger('error');
      });
  };
}
