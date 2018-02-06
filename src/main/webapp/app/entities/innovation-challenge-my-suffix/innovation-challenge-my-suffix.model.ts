import { BaseEntity } from './../../shared';

export class InnovationChallengeMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public challengeName?: string,
        public challengeDescription?: string,
        public dateCreated?: any,
        public startDate?: any,
        public endDate?: any,
        public createdBy?: string,
        public category?: BaseEntity,
    ) {
    }
}
