import ExpirationDate from './expirationDate';

export type NumberOfElements = string | number | undefined;

export default class Item {
    private name: string;
    private expireDate: ExpirationDate;
    private numberOfElements: NumberOfElements;

    constructor(name: string, expireDate: ExpirationDate, numberOfElements: NumberOfElements) {
        this.name = name;
        this.expireDate = expireDate;
        this.numberOfElements = this.isEmpty(numberOfElements) ? 1 : numberOfElements;
    }

    private isEmpty(numberOfElements: NumberOfElements): boolean {
        if (numberOfElements && numberOfElements.toString() === '-') {
            return true;
        }
        return false;
    }
}