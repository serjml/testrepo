import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { DataResSelect } from '../controller/loader';

class App {
    private controller: AppController;
    private view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    public start() {
        (document
            .querySelector('.sources') as HTMLTemplateElement)
            .addEventListener('click', (e: MouseEvent) => this.controller.getNews(e, (data: DataResSelect) => this.view.drawNews(data)));
            this.controller.getSources((data: DataResSelect) => this.view.drawSources(data));
    }
}

export default App;