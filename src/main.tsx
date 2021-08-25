import ReactDOM from "react-dom";
import { WrappedApp } from "./wrappedApp";
import localforage from "localforage"

localforage.config({
  driver      : [localforage.WEBSQL, localforage.INDEXEDDB, localforage.LOCALSTORAGE], // Force WebSQL; same as using setDriver()
  name        : 'myApp',
  version     : 1.0,
  size        : 4980736, // Size of database, in bytes. WebSQL-only for now.
  storeName   : 'keyvaluepairs', // Should be alphanumeric, with underscores.
  description : 'some description'
});

ReactDOM.render(WrappedApp, document.getElementById("root"));
