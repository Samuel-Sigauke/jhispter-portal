import { BaseEntity } from './../../shared';

export class CategoryMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public categoryName?: string,
        public dateCreated?: any,
        public categoryDescription?: string,
        public createdBy?: string,
    ) {
    }
}
