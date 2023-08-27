import ExpirationCategory from './expirationCategory';
import ExpirationDate from './expirationDate';

export type NumberOfElements = string | number | undefined;

export default class Item {
    private name: string;
    private expirationDate: ExpirationDate;
    private numberOfElements: NumberOfElements;
    private expirationCategory: ExpirationCategory;

    constructor(name: string, expirationDate: ExpirationDate, numberOfElements: NumberOfElements, 
        expirationCategories: ExpirationCategory[]) {
        this.name = name;
        this.expirationDate = expirationDate;
        this.numberOfElements = this.isEmpty(numberOfElements) ? 1 : numberOfElements;
        expirationCategories.forEach(c => {
            if (c.isCategory(this.expirationDate.getDaysTillExpired())) {
                this.expirationCategory = c;
            }
        });
    }

    private isEmpty(numberOfElements: NumberOfElements): boolean {
        return numberOfElements?.toString() === '-';
    }

    toDTO(): ItemDTO {
        return new ItemDTO(this.name, this.expirationDate, this.numberOfElements, this.expirationCategory);
    }
}

export class ItemDTO {
    constructor(readonly name: string, 
                readonly expirationDate: ExpirationDate, 
                readonly numberOfElements: NumberOfElements, 
                readonly expirationCategory: ExpirationCategory) { }
}