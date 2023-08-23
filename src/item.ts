import ExpirationDate from './expirationDate';

export default class Item {
    private name: string;
    private expireDate: ExpirationDate;
    private numberOfElements: string | number | undefined;

    constructor(name: string, expireDate: ExpirationDate, numberOfElements: string | number | undefined) {
        this.name = name;
        this.expireDate = expireDate;
        this.numberOfElements = this.isEmpty(numberOfElements) ? 1 : numberOfElements;
    }

    private isEmpty(numberOfElements: string | number | undefined): boolean {
        if (numberOfElements && numberOfElements.toString() === '-') {
            return true;
        }
        return false;
    }
}