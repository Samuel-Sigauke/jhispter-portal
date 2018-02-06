import { BaseEntity } from './../../shared';

export const enum Category {
    'IT',
    'PAYMENTS',
    'SALES',
    'MARKETING'
}

export const enum Rating {
    'BELOW_AVERAGE',
    'AVERAGE',
    'ABOVE_AVERAGE',
    'GREAT'
}

export class ProcessImprovementMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public problemName?: string,
        public problemDesc?: string,
        public category?: Category,
        public rating?: Rating,
        public comments?: BaseEntity[],
    ) {
    }
}
