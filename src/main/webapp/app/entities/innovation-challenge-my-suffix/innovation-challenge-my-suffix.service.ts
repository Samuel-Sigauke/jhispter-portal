import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { InnovationChallengeMySuffix } from './innovation-challenge-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class InnovationChallengeMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/innovation-challenges';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(innovationChallenge: InnovationChallengeMySuffix): Observable<InnovationChallengeMySuffix> {
        const copy = this.convert(innovationChallenge);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(innovationChallenge: InnovationChallengeMySuffix): Observable<InnovationChallengeMySuffix> {
        const copy = this.convert(innovationChallenge);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<InnovationChallengeMySuffix> {
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
     * Convert a returned JSON object to InnovationChallengeMySuffix.
     */
    private convertItemFromServer(json: any): InnovationChallengeMySuffix {
        const entity: InnovationChallengeMySuffix = Object.assign(new InnovationChallengeMySuffix(), json);
        entity.dateCreated = this.dateUtils
            .convertDateTimeFromServer(json.dateCreated);
        entity.startDate = this.dateUtils
            .convertDateTimeFromServer(json.startDate);
        entity.endDate = this.dateUtils
            .convertDateTimeFromServer(json.endDate);
        return entity;
    }

    /**
     * Convert a InnovationChallengeMySuffix to a JSON which can be sent to the server.
     */
    private convert(innovationChallenge: InnovationChallengeMySuffix): InnovationChallengeMySuffix {
        const copy: InnovationChallengeMySuffix = Object.assign({}, innovationChallenge);

        copy.dateCreated = this.dateUtils.toDate(innovationChallenge.dateCreated);

        copy.startDate = this.dateUtils.toDate(innovationChallenge.startDate);

        copy.endDate = this.dateUtils.toDate(innovationChallenge.endDate);
        return copy;
    }
}
