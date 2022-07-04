export interface LoaderOptions {
    readonly [index: string]: string;
}

export type CallbackFunc<T, U> = (data: T) => U;

interface ResOptions {
    readonly endpoint: string;
    readonly options?: Partial<LoaderOptions>;
}

type Category = "business" | "entertainment" | "general" | "health" | "science" | "sports" | "technology";

export interface DataSources {
    readonly category: Readonly<Category>;
    readonly country: string;
    readonly description: string;
    readonly id: string;
    readonly language: string;
    readonly name: string;
    readonly url: string;
}

export interface DataArticles {
    readonly author: string | null;
    readonly content: string;
    readonly description: string | null;
    readonly publishedAt: string; 
    readonly source: Pick<DataSources, "id" | "name">;
    readonly title: string;
    readonly url: string;
    readonly urlToImage: string | null;
}

export interface DataResSelect {
    readonly status: string;
    readonly totalResults: number;
    readonly articles: Array<DataArticles>;
    readonly sources?: Array<DataSources>;
}

enum ResError {
    Unauthorized = 401,
    NotFound = 404,
}

interface ILoader {
    readonly baseLink: string;
    readonly options: Readonly<LoaderOptions>;
    getResp(responseOptions:  Readonly<ResOptions>, callback: CallbackFunc<DataResSelect, void>): void;
    errorHandler(res: Response): (never | Response);
    makeUrl(options: Partial<LoaderOptions>, endpoint: string): string; 
    load(method: string, endpoint: string, callback: CallbackFunc<DataResSelect, void>, options: Partial<LoaderOptions>): void;
}

class Loader implements ILoader {
    public baseLink: string;
    public options: Readonly<LoaderOptions>;
    constructor(baseLink: string, options: Readonly<LoaderOptions>) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp(
        { endpoint, options = {} }: ResOptions,
        callback: CallbackFunc<DataResSelect, void> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load('GET', endpoint, callback, options);
    }

    public errorHandler(res: Readonly<Response>) {
        if (!res.ok) {
            if (res.status === ResError.Unauthorized || res.status === ResError.NotFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    public makeUrl(options: Partial<LoaderOptions>, endpoint: string) {
        const urlOptions = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    public load(method: 'GET' | 'POST', endpoint: string, callback: CallbackFunc<DataResSelect, void>, options = {} as Partial<LoaderOptions>) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
