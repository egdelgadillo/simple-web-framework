# Simple Web Framework

Simple Web Framework is a simple old-school-like javascript web framework built on TypeScript that resembles / is inspired on Backbone.js and Marionette.js.

This framework and its implementation was made following the [Typescript: The Complete Developer's Guide [2020]](https://www.udemy.com/course/typescript-the-complete-developers-guide) course. Most of the design credit is granted to **[Stephen Grider](https://www.udemy.com/user/sgslo/)**, a shoutout to him, he's a great instructor. I recommend watching his courses.

_Some refactor has been made to make it easier to comment and explain on its functionality._

The objective of this framework is not to add to the open source community as its code is outdated or useless compared to modern frameworks. It was only made for learning and proof-of-concept purposes.

## What I've learned

From this project I've learned some new concepts as well as went over again some already known concepts.

I learned the **real difference between _composition vs inheritance_ in JavaScript**. Composition vs inheritance is a generally misunderstood concept. This was a concept first introduced at the book [Design Patterns, Elements of Reusable Object-Oriented Software](http://www.uml.org.cn/c++/pdf/designpatterns.pdf), 1994, page 20, where its says: `"Favor object composition over class inheritance"`.

Although most people understand composition as a simple concept where you can just simply _Object.assign()_ an object's attributes and methods to another object.

This is not the concept first introduced by the book as it only resembles another way to "copy-paste" an object properties to another, a concept not very far from the inheritance concept.

Instead of that, the book favors keeping an **instance** of the Object and **delegating** that Object's specific tasks to _that instance_.

You can read more about this on the book, or you can also learn more about this at Stephen's course, currently lesson number 123.

Thanks to this course I've not only strenthened the knowledge of the difference between composition and inheritance, but also the different ways to implement them as well as when and where to implement which, depending on the context.

Another concept I've learned from this course is the functionality and difference between a **framework's Models and Views**, as well as how to implement them, its restrictions, and requirements.

Also I've learned and strengthened some very TypeScript-specific concepts, for example **Generics**, a very useful but advanced topic.

I've implemented as well different types of **Interfaces** and **Types**, using them as constraints for classes, more like "connectors" between them, as well as used them to my advantage to take the most out of **TypeScript's Static Type checks**.

One of the most important concepts I've strenthened is the importance of making sure to have as less **`<any>` types** as possible, which can be tedious sometimes, but provides a lot of **type and error checks**, which is the great purpose of TypeScript.

I've also practiced a little bit of **HTML** and **front-end javascript** which currently is not my strong point as I'm focusing on backend logic, so any kind of practice is welcome.

I also saw a little bit of **Dependency Injection** or at least a simple version of it (Collection.ts). This is a very important subject and what I saw here was not enough, so will have to git a bit more on this subject.

But even more than anything I've strenthened my Javascript knowledge as a whole as well as TypeScript-related logic, syntax and good practices.

## Run

To run the project you need to clone the repository.

```
git clone https://github.com/egdelgadillo/simple-web-framework

cd simple-web-famework
```

We now need to install the required dependencies.

```
npm install
```

After all dependencies are installed we can run the **start** script configured on the project's package.json.

```
npm run start
```

The project can be accessed at [http://localhost:1234/](http://localhost:1234/), while the RESTful API (Provided by the **json-sever** module) can be accessed at [http://localhost:3000/](http://localhost:3000/).

## Required Modules

This project depends on five different modules: two of them are _regular dependencies_, while the other three are only required as _development dependencies_.

Dependencies:

- json-server
- axios

Development Dependencies:

- typescript
- parcel-bundler
- concurrently

### Dependencies

#### json-server

This module is used to simulate an external **RESTful API**. It's data resides on the `db.json` file located on the root path. It serves the data by default at **localhost:3000** following the **[RESTful APIs Conventions](https://restfulapi.net/resource-naming/)**.

#### Axios

The **Axios** module is used to manage the RESTful API calls (In this case managed by the **json-server** module).

### Development Dependencies

#### typescript

This module is self-explanatory. This is the base module of the development part of the project as it provides the basic TypeScript functionality.

#### parcel-bundler

We use the the parcel-bundler module to serve and render the root `index.html` file on **localhost:1234** (By default). It also recognizes and handles the TypeScript file, compiles it to JavaScript and therefore is executed on the client-side. Thanks to this module we can import the **.ts** file directly to the `index.html` file with a simple `<script>` tag.

#### concurrently

## Structure

This simple web framework consists of two main folders:

- framework
- src

The **framework** folder contains all the classes and objects required to import in order to use the framework, while the **src** folder implements a simple project using it.

Although it's not common practice, in this case the **framework** folder was left outside the **src** folder in order to be able to clearly distinguish the _framework_ from its _implementation_.

### Framework Structure

The _framework_ folder also consists of two folders:

- models
- views

### Framework's Model Structure

The **models** folder mainly exports the **Model** class which also implements different modules through **Composition**:

- Eventing: Eventing Module
- Attributes: Model Data Module
- ApiSync: Model Data Sync Module

All modules can be swapped just as easy as defining a new Model attribute and creating a new instance of it, as long as it comforms to each **interface** defined for each different module. Each interface work as a constrain, statically defining the required methods to work with the Model class.

As stated before, the Model class implements **the real concept of composition in javascript**, which means that it only stores **an instance** of the module instead of "copy / pasting" each module, its methods, attributes, etc to the Module class. This also means that it **delegates** each request to the corresponding module using its instances.

As also stated before, each module conforms to its corresponding Model's interface, providing the required methods to work with it.
The description of each module's functionality and their required methods are now explained:

#### Eventing Module:

This module resembles the functionality of the _Backbone.js_ framework providing `on()` and `trigger()` methods, which extends to all Models and also Collections (See Collection Section).

#### Attributes Module:

This module handles the attributes of each Model, using **Generics**. This also resembles the functionality of _Backbone.js_ framework as it provides the `get()` and `set()` methods.

#### The ApiSync Module

The ApiSync module handles the syncronization of the Model data through an external API, following the **[RESTful APIs Conventions](https://restfulapi.net/resource-naming/)**. For that end the RESTful API is simulated with the **json-server** package. This data handling is done through the `save()` and `fetch()` methods.

#### The Collection Module

The Collection module is almost as important as the Model module as it provides the structure to create **a Collection of Module instances** (Also using composition), an array of them. Most of its functionality is available _after_ calling its own implementation of the `fetch()` method. It also implements it's own **Eventing** instances and delegates all events to them.

### Framework's View Structure

The Simple Web Framework view folder consists in a main View and in a Collection View which are the basic classes from where to inherit the view functionality of the framework. Both are abstract classes as it forces the implementation of the required methods needed to print a view client-side.

In this case, inheritance was chosen over composition due to it's easier implementation; turned out to be more difficult to hold an instance of each module on each different View than just inheriting from the parent class.

Both, View and CollectionView functionality is also explained:

#### The View Module

The View module resembles the Marionette.js' regions functionality and old-school DOM Elements event management.

The regions management system has a simple functionality as it only requires to implement the `regionsMap()` method and return an object with the `{region-name: region-selector}` format. This regionsMap() method is then called by the `render()` method which queries the document fragment by each _selector_ and then maps it to the `this.regions` View attribute.

The Event management system also requires a simple implementation of the `eventsMap()` method requiring it to return an object with a `{"JS-event-name:DOM-element-selector": callback-function}` format. Then this eventsMap() method is also called at the `render()` View method and maps those callbacks to each event on the DOM.

#### The CollectionView Module

The Collection Module has a similar structure to the View Module but simpler as it does not implement Events and Regions. In contrast to the View module it does require an instance of a Model Collection from where to extract data and render.

This is also an abstract class as it requires an implementation of both `template()` and `renderItem()` methods, which hold information on how to render the Collection as a whole and also each individual Collection's item.

### Main Implementation Structure

The main implementation of the web framework is bootstraped by the `index.ts` file and also consists of two main folders:

- models
- views

The purpose of each folder and its contents is now explained:

#### Models folder

In the Models folder we implement a User model which **inherits** from the framework's _Model_ class. In this case **composition was not used** due to it being easier to understand, implement and maintain this way. It takes advantage of the Model's generic design to assign to it it's own data type, called in this case `UserProps` which stands for "_User Properties_". It then provides two **static helper methods** used to facilitate the creation of both: New User (`buildUser()`) and New User Collection ( `buildUserCollection()`). Of course, all this tasks can be done without the help of those static methods.

The User model is the clear example of how "Simple" the _Simple Web Framework_ is, as it only takes a few lines in order to create a personalized new Module.

#### Views folder

In the Views folder holds the implementation of the application's "front-end" experience part. This all renders to the `index.html` root file which also holds a specific style to be able to distinguish each `<div>` and therefore each different View component rendered.

This **views** folder holds three Views implementation and one Collection.

The **View** class is implemented on both the `UserShow.ts` and the `UserForm.ts`, and they are similar in functionality. The only difference between them is that the `UserForm` class has a more complete implementation of the `Model` class and binding its data from the front-end to the back-end.

In this case, the `UserEdit.ts` file works as a parent container for both `UserShow` and `UserForm` views. In here we make use of the framework's region system to map each view on the selected UserEdit class' regions.

Finally, the `UserList.ts` file contains an implementation of the framework's **CollectionView** class. It only consists on the desired view template string, in which we inject each of the Model instances which holds the Collection used by this class as elements.

## License

[GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html)

I do not own most of the logic, and code ideas reflected in this repository, therefore the most appropiate license in this case I believe it to be the [GNU General Public License](https://www.gnu.org/licenses/gpl-3.0.en.html)
