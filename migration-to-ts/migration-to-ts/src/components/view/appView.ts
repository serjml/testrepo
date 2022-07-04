import News from './news/news';
import Sources from './sources/sources';
import { DataArticles, DataSources, DataResSelect } from '../controller/loader';

export class AppView {
    private news: News;
    private sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data: Readonly<DataResSelect>) {
        const values: DataArticles[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data: Readonly<DataResSelect>) {
        const values: DataSources[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
