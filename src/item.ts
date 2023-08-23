import ExpirationCategory from './expirationCategory';
import ExpirationDate from './expirationDate';

export type NumberOfElements = string | number | undefined;

export default class Item {
    private name: string;
    private expireDate: ExpirationDate;
    private numberOfElements: NumberOfElements;
    private expirationCategory: ExpirationCategory;

    constructor(name: string, expireDate: ExpirationDate, numberOfElements: NumberOfElements, 
        expirationCategories: ExpirationCategory[]) {
        this.name = name;
        this.expireDate = expireDate;
        this.numberOfElements = this.isEmpty(numberOfElements) ? 1 : numberOfElements;
        expirationCategories.forEach(c => {
            if (c.isCategory(this.expireDate.getDaysTillExpired())) {
                this.expirationCategory = c;
            }
        });
    }

    private isEmpty(numberOfElements: NumberOfElements): boolean {
        if (numberOfElements && numberOfElements.toString() === '-') {
            return true;
        }
        return false;
    }
}