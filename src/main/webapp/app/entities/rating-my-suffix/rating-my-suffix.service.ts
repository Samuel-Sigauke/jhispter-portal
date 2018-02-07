import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { RatingMySuffix } from './rating-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class RatingMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/ratings';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(rating: RatingMySuffix): Observable<RatingMySuffix> {
        const copy = this.convert(rating);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(rating: RatingMySuffix): Observable<RatingMySuffix> {
        const copy = this.convert(rating);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<RatingMySuffix> {
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
     * Convert a returned JSON object to RatingMySuffix.
     */
    private convertItemFromServer(json: any): RatingMySuffix {
        const entity: RatingMySuffix = Object.assign(new RatingMySuffix(), json);
        entity.dateRated = this.dateUtils
            .convertDateTimeFromServer(json.dateRated);
        return entity;
    }

    /**
     * Convert a RatingMySuffix to a JSON which can be sent to the server.
     */
    private convert(rating: RatingMySuffix): RatingMySuffix {
        const copy: RatingMySuffix = Object.assign({}, rating);

        //copy.dateRated = this.dateUtils.toDate(rating.dateRated);
        return copy;
    }
}
