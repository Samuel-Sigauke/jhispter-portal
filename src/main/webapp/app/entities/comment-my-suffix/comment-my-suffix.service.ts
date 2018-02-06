import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CommentMySuffix } from './comment-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CommentMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/comments';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(comment: CommentMySuffix): Observable<CommentMySuffix> {
        const copy = this.convert(comment);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(comment: CommentMySuffix): Observable<CommentMySuffix> {
        const copy = this.convert(comment);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CommentMySuffix> {
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
     * Convert a returned JSON object to CommentMySuffix.
     */
    private convertItemFromServer(json: any): CommentMySuffix {
        const entity: CommentMySuffix = Object.assign(new CommentMySuffix(), json);
        entity.datePosted = this.dateUtils
            .convertDateTimeFromServer(json.datePosted);
        return entity;
    }

    /**
     * Convert a CommentMySuffix to a JSON which can be sent to the server.
     */
    private convert(comment: CommentMySuffix): CommentMySuffix {
        const copy: CommentMySuffix = Object.assign({}, comment);

      //  copy.datePosted = this.dateUtils.toDate(comment.datePosted);
        return copy;
    }
}
