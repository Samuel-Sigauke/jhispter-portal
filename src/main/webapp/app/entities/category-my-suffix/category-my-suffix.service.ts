import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CategoryMySuffix } from './category-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CategoryMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/categories';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(category: CategoryMySuffix): Observable<CategoryMySuffix> {
        const copy = this.convert(category);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(category: CategoryMySuffix): Observable<CategoryMySuffix> {
        const copy = this.convert(category);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CategoryMySuffix> {
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
     * Convert a returned JSON object to CategoryMySuffix.
     */
    private convertItemFromServer(json: any): CategoryMySuffix {
        const entity: CategoryMySuffix = Object.assign(new CategoryMySuffix(), json);
        entity.dateCreated = this.dateUtils
            .convertDateTimeFromServer(json.dateCreated);
        return entity;
    }

    /**
     * Convert a CategoryMySuffix to a JSON which can be sent to the server.
     */
    private convert(category: CategoryMySuffix): CategoryMySuffix {
        const copy: CategoryMySuffix = Object.assign({}, category);

        copy.dateCreated = this.dateUtils.toDate(category.dateCreated);
        return copy;
    }
}
