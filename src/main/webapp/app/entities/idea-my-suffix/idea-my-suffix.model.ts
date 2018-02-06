import { BaseEntity } from './../../shared';

export class IdeaMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public ideaTitle?: string,
        public ideaSummary?: string,
        public dateCreated?: any,
        public postedBy?: string,
        public inovationChallenge?: BaseEntity,
    ) {
    }
}
