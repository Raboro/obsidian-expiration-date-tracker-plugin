import ExpirationCategory from './expirationCategory';
import ExpirationDate from './expirationDate';

type NumberOfElements = string | number | undefined;

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
        this.setExpirationCategory(expirationCategories);
    }

    private setExpirationCategory(expirationCategories: ExpirationCategory[]) {
        expirationCategories.forEach(c => {
            if (c.isCategory(this.expirationDate.getDaysTillExpired())) {
                this.expirationCategory = c;
            }
        });
        if (this.isSmallerThenExpired(expirationCategories)) {
            this.expirationCategory = expirationCategories[0];
        }
    }

    private isEmpty(numberOfElements: NumberOfElements): boolean {
        return numberOfElements?.toString() === '-';
    }

    private isSmallerThenExpired(expirationCategories: ExpirationCategory[]) {
        return !expirationCategories[0].isCategory(this.expirationDate.getDaysTillExpired());
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