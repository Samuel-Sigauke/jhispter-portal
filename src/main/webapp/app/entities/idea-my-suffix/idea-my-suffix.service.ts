import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { IdeaMySuffix } from './idea-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class IdeaMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/ideas';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(idea: IdeaMySuffix): Observable<IdeaMySuffix> {
        const copy = this.convert(idea);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(idea: IdeaMySuffix): Observable<IdeaMySuffix> {
        const copy = this.convert(idea);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<IdeaMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to IdeaMySuffix.
     */
    private convertItemFromServer(json: any): IdeaMySuffix {
        const entity: IdeaMySuffix = Object.assign(new IdeaMySuffix(), json);
        entity.dateCreated = this.dateUtils
            .convertDateTimeFromServer(json.dateCreated);
        return entity;
    }

    /**
     * Convert a IdeaMySuffix to a JSON which can be sent to the server.
     */
    private convert(idea: IdeaMySuffix): IdeaMySuffix {
        const copy: IdeaMySuffix = Object.assign({}, idea);

        copy.dateCreated = this.dateUtils.toDate(idea.dateCreated);
        return copy;
    }
}
