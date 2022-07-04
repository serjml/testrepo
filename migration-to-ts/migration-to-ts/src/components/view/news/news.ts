import './news.css';
import { DataArticles } from '../../controller/loader';

class News {
    public draw(data: DataArticles[]) {
        const news: DataArticles[] = data.length >= 10 ? data.filter((_item: DataArticles, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            if (idx % 2) (newsClone.querySelector('.news__item') as HTMLTemplateElement).classList.add('alt');

            (newsClone.querySelector('.news__meta-photo') as HTMLTemplateElement).style.backgroundImage = `url(${
                item.urlToImage || 'https://zetaglobal.com/wp-content/uploads/2018/01/maxresdefault-1024x576.jpg'
            })`;
            (newsClone.querySelector('.news__meta-author') as HTMLTemplateElement).textContent = item.author || item.source.name;
            (newsClone.querySelector('.news__meta-date') as HTMLTemplateElement).textContent = item.publishedAt
                .slice(0, 10)
                .split('-')
                .reverse()
                .join('-');

            (newsClone.querySelector('.news__description-title') as HTMLTemplateElement).textContent = item.title;
            (newsClone.querySelector('.news__description-source') as HTMLTemplateElement).textContent = item.source.name;
            (newsClone.querySelector('.news__description-content') as HTMLTemplateElement).textContent = item.description;
            (newsClone.querySelector('.news__read-more a') as HTMLTemplateElement).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        (document.querySelector('.news') as HTMLTemplateElement).innerHTML = '';
        (document.querySelector('.news') as HTMLTemplateElement).appendChild(fragment);
    }
}

export default News;
