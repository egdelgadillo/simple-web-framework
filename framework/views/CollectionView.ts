/*
 * CollectionView Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { Collection } from '../models/Collection';
import { Model } from '../models/Model';

/*
 * The CollectionView class is a generic class which is in charge of
 * handling the collection data and rendering each item onto the browser.
 * How the data is rendered is up to the user who extends this abstract
 * class. The abstraction is necessary due to the renderItem() and template()
 * methods being required to be defined and implemented by the developer.
 * Also, as a generic class, requires a Model Type (T) and the Model
 * properties type (K).
 * To instantiate the CollectionView class it is required to provide a
 * Collection type collection. It then is able to render the HTML string
 * returned from the template() method onto the parent Element whenever
 * render() is called and when 'change' events are triggered.
 */
export abstract class CollectionView<T extends Model<K>, K> {
  /*
   * renderItem is the first abstract method required to extend the
   * CollectionView class. After the Collection's models are fetched
   * (by the Collection's fetch() method) it cycles through each Model
   * and calls this renderItem() function with each model. The developer
   * should then define how to handle each model data and how to render it.
   */
  abstract renderItem(model: T, parent: DocumentFragment): void;

  /*
   * The template() method is an abstract method required to render the
   * HTML-type string returned from it onto the CollectionView's parent
   * HTML element. This functionality is similar to the View's module
   * template() method.
   */
  abstract template(): string;

  /*
   * The CollectionView's constructor requires to provide an Element type
   * HTML element onto where the class-defined HTML will be rendered on the
   * browser. It's also a requirement to provide an instance of the Collection
   * to be used and from which to extract each Model's data.
   * The constructor defines a 'change' event to call the render() method, which
   * ensures that whenever we fetch data we render that new data onto the browser.
   * This is required as the Collection's fetch is asynchronous.
   * After that if fetches the Collection's data by calling its fetch() method.
   */
  constructor(public parent: Element, public collection: Collection<T, K>) {
    this.collection.on('change', (): void => {
      this.render();
    });
    this.collection.fetch();
  }

  /*
   * The render method is the most important method of the CollectionView class.
   * It handles the Collection's data and insures to call the renderItem() method
   * for each Method the Collection has. This ensures that the developer will be
   * able to treat each module as a single piece of information and extract, process,
   * render, etc its data.
   * For that purpose it first deletes the contents of the parent HTML element, similar
   * to the View's class render() method, in order to add new information each time
   * render() is called. After that it creates a new empty Element which is then passed
   * to the renderItem() method for it to attach new Elements to it as the developer
   * defines.
   * After all that process is done it then adds the newly created HTML element to the
   * CollectionView's parent HTML element.
   */
  render = (): void => {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();

    for (let model of this.collection.model) {
      this.renderItem(model, templateElement.content);
    }

    this.parent.append(templateElement.content);
  };
}
