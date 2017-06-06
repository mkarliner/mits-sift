/**
 * Mitsift Sift. Frontend controller entry point.
 */
import { SiftController, registerSiftController } from '@redsift/sift-sdk-web';

export default class MyController extends SiftController {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();
    this._suHandler = this.onStorageUpdate.bind(this);
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftcontroller
  loadView(state) {
    console.log('mitsift: loadView', state);
    // Register for storage update events on the "count" bucket so we can update the UI
    this.storage.subscribe(['messageSummarys'], this._suHandler);
    switch (state.type) {
      case 'email-thread':
        let w = 0;
        try {
          w = state.params.detail.words;
        }catch(e){ }
        return { html: 'email-thread.html', data: { words: w } };
      case 'summary':
        return { html: 'summary.html', data: this.getSummarys() };
      default:
        console.error('mitsift: unknown Sift type: ', state.type);
    }
  }

  // Event: storage update
  onStorageUpdate(value) {
    console.log('mitsift: onStorageUpdate: ', value);
    return this.getSummarys().then((summarys) => {
      // Publish 'counts' event to view
      this.publish('messageSummarys', summarys);
    });
  }

  getSummarys() {
    return this.storage.getAll({
      bucket: 'messageSummarys'
    }).then((values) => {
      return values
    });
  }
}

// Do not remove. The Sift is responsible for registering its views and controllers
registerSiftController(new MyController());
