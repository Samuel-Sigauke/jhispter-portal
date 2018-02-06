import { BaseEntity } from './../../shared';

export class CommentMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public commentSummary?: string,
        public datePosted?: any,
        public commentedBy?: string,
        public idea?: BaseEntity,
    ) {
    }
}
