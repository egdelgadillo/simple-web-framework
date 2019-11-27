/*
 * Eventing Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 */

/*
 * Simple Callback function type definition used to keep a clean code
 */
type Callback = () => void;

/*
 * The Eventing module is the one which handles the project-wide events
 * It simply maps some callbacks functions on an events Object depending
 * on the event name and then triggers then, which means that it looks for
 * the eventName key on the object and executes its callback function. This
 * module implements a very nice and simple eventing system, and for the
 * simple but important work it does it does not even has any module dependencies.
 * The Eventing class was made in order to follow the composition-style
 * architecture, to which is delegated the Eventing-specific tasks
 */
export class Eventing {
  events: { [key: string]: Callback[] } = {};

  /*
   * The on() method handles the registration of new events, and maps the
   * given callback to its eventName on the class' events attribute.
   */
  on = (eventName: string, callback: Callback): void => {
    const event = this.events[eventName] || [];
    event.push(callback);
    this.events[eventName] = event;
  };

  /*
   * The trigger() method triggers the eventName on the class' events attribute
   * by calling each callback function that were previously given to the on()
   * method.
   */
  trigger = (eventName: string): void => {
    const events = this.events[eventName];

    if (!events || events.length === 0) return;

    events.forEach(events => {
      events();
    });
  };
}
