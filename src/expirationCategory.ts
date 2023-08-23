export default class ExpirationCategory {
    private name: string;
    private value: number;

    constructor(name: string, value: number) {
        this.name = name;
        this.value = value;
    }
    
    isCategory(value: number): boolean {
        return this.value <= value;
    }
}