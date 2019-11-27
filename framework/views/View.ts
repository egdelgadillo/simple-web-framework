/*
 * View Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */
import { Model } from '../models/Model';

/*
 * The View Module it responsible for rendering portions of HTML elements
 * on the browser. As it will be inherited by other classes this type of
 * class is also a Generic class, with both a Model type (T) and the model
 * properties type (K).
 * As the View class requires specific implementation of some methods its
 * an abstract class and contains the abstract template() method. It also
 * provides other helper functions which execute at render time and which
 * are optional to declare / define to add more functionality for example
 * the eventsMap() and regionsMap() methods.
 * It extends and requires the Model module to extend its functionality when
 * a module is provided to the constructor.
 */
export abstract class View<T extends Model<K>, K> {
  /*
   * The required abstract method which will be used to create HTML elements.
   * The string returned from this method is then used to create an HTML element
   * on the render() method, so its required to have an HTML syntax.
   */
  abstract template(): string;

  /*
   * regions is an attribute which can be used if regions are defined. This provides
   * the structure necessary to simulate the functionality of Marionette.js' regions.
   * It's an object which will be populated by the mapRegions() method if the
   * regionsMap() function is defined on the View implementation.
   * It will have an object which will point to HTML elements from which can be nested
   * other views.
   */
  public regions: { [regionName: string]: Element } = {};

  /*
   * The View Constructor requires the HTML parent element inside where it will render
   * the template content and some other properties (Regions for example) at the time
   * the render() method is executed.
   * The required model attribute will be used by default to map Javascript events on
   * the client-side using the Model's Eventing system, and is also available as a
   * public attribute if needed to use.
   */
  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  /*
   * The eventsMap() method is by default returning an empty object but is still
   * being called by the bindEvents() method which in term is also called by the
   * render() method. If the method is re-defined on the View implementation and
   * returns an object with data on it, then the bindEvents() method will map the
   * contents of that returned object as events on the browser.
   * The format of the object returned by the eventsMap method must follow the
   * {javascript-event-name: callback-function-to-be-executed} format.
   * For more information go to the bindEvents() method.
   */
  eventsMap(): { [key: string]: () => void } {
    return {};
  }

  /*
   * The regionsMap() method is by default returning an empty object but is still
   * being called by the mapRegions() method which in term is also called by the
   * render() method. If the method is re-defined on the View implementation and
   * returns an object with data on it, then the mapRegions() method will map the
   * View class' regions attribute with the HTML elements specified by the regionsMap
   * return object (After querying for them).
   * The object returned by the regionsMap() method must follow the
   * {name-of-the-region: region-key-to-query-on-HTML} format.
   */
  regionsMap(): { [regionName: string]: string } {
    return {};
  }

  /*
   * Helper function called by the Event module constructor. This just maps
   * the render() method to be called each time a 'change' event was triggered
   * on the model to be used.
   */
  bindModel = (): void => {
    this.model.on('change', this.render);
  };

  /*
   * The bindEvents() method is always called by the render() method and its
   * function is to map user-defined JS events, such as 'click', 'mouseover',
   * etc onto the browser, and bind them to user-defined callback functions.
   * This functionality is only executed if the eventsMap() method returns an
   * object that is not empty, so by default this functionality is 'disabled'
   * until the user redefines the eventsMap() function and return a non-empty
   * object.
   * For more information on the object's format go to the eventsMap() method.
   */
  bindEvents = (fragment: DocumentFragment): void => {
    const eventsMap = this.eventsMap();

    for (let eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach(element => {
        element.addEventListener(eventName, eventsMap[eventKey]);
      });
    }
  };

  /*
   * The mapRegions() method is always called by the render() method and its
   * purpose is to map user-defined regions onto the View's regions attribute
   * (After querying for them).
   * This functionality is only executed if the regionsMap() method return an
   * object that is not empty, so by default this method is 'disabled' until
   * the user redefined the regionsMap() method and returns a non-empty object.
   * For more information on the object's format go to the regionsMap() method.
   */
  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();

    for (let key in regionsMap) {
      let htmlElement = fragment.querySelector(regionsMap[key]);
      if (htmlElement) {
        this.regions[key] = htmlElement;
      }
    }
  }

  /*
   * The onRender() method is a helper function useful to map regions
   * to the View HTML element fragment that is created when the render()
   * method is executed.
   * By default it's always called by the render() method but is only useful
   * when redefined by the user and also when the regionsMap() method returns
   * a non-empty object.
   * It is worth to mention that this function is called before document
   * fragment is rendered to the View's parent element, uselful to render
   * other HTML elements before that.
   */
  onRender(): void {}

  /*
   * The render() method is a simple yet very important method on the View
   * class as it calls other important methods and functionalities and then
   * renders the HTML Elements onto its parent, the View's parent element.
   * the render() method first deletes the contents of the parent element
   * in order to be able to update its contents if new data is present and
   * the render() method is called. An example of this is the 'change' event
   * is triggered (See bindModel() method). It then calls mapRegions() and
   * bindEvents() methods in order to try to map the regions if any and register
   * the events if any, respectively.
   * One step before rendering the full HTML element onto the parent it calls the
   * onRender() method, useful to rendering child elements. After that's done
   * it renders the whole element onto the View's parent element.
   */
  render = (): void => {
    this.parent.innerHTML = '';

    const templateElement = document.createElement('template');

    templateElement.innerHTML = this.template();

    this.mapRegions(templateElement.content);
    this.bindEvents(templateElement.content);
    this.onRender();

    this.parent.append(templateElement.content);
  };
}
