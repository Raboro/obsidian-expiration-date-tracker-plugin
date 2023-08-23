import ExpirationDate from './expirationDate';

export default class Item {
    private name: string;
    private expireDate: ExpirationDate;
    private numberOfElements: string | number | undefined;

    constructor(name: string, expireDate: ExpirationDate, numberOfElements?: string | number) {
        this.name = name;
        this.expireDate = expireDate;
        this.numberOfElements = numberOfElements ?? undefined;
    }
}