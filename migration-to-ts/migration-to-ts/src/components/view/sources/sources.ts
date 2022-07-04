import './sources.css';
import { DataSources } from '../../controller/loader';

class Sources {
    public draw(data: DataSources[]) {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: DataSources) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            (sourceClone.querySelector('.source__item-name') as HTMLTemplateElement).textContent = item.name;
            (sourceClone.querySelector('.source__item')as HTMLTemplateElement).setAttribute('data-source-id', item.id);
            
            fragment.append(sourceClone);
        });

        (document.querySelector('.sources')as HTMLTemplateElement).append(fragment);
    }
}

export default Sources;