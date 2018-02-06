import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { ProcessImprovementMySuffix } from './process-improvement-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ProcessImprovementMySuffixService {

    private resourceUrl =  SERVER_API_URL + 'api/process-improvements';

    constructor(private http: Http) { }

    create(processImprovement: ProcessImprovementMySuffix): Observable<ProcessImprovementMySuffix> {
        const copy = this.convert(processImprovement);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(processImprovement: ProcessImprovementMySuffix): Observable<ProcessImprovementMySuffix> {
        const copy = this.convert(processImprovement);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<ProcessImprovementMySuffix> {
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
     * Convert a returned JSON object to ProcessImprovementMySuffix.
     */
    private convertItemFromServer(json: any): ProcessImprovementMySuffix {
        const entity: ProcessImprovementMySuffix = Object.assign(new ProcessImprovementMySuffix(), json);
        return entity;
    }

    /**
     * Convert a ProcessImprovementMySuffix to a JSON which can be sent to the server.
     */
    private convert(processImprovement: ProcessImprovementMySuffix): ProcessImprovementMySuffix {
        const copy: ProcessImprovementMySuffix = Object.assign({}, processImprovement);
        return copy;
    }
}
