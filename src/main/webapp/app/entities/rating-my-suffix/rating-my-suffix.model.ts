import { BaseEntity } from './../../shared';

export const enum RatingPoints {
    'ONE',
    'TWO',
    'THREE',
    'FOUR',
    'FIVE'
}

export class RatingMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public ratingPoints?: RatingPoints,
        public ratedBy?: string,
        public dateRated?: any,
        public idea?: BaseEntity,
    ) {
    }
}
