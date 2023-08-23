export default class ExpirationDate {
    private str: string;
    private date: Date;
    private daysTillExpired: number;

    constructor(str: string, dateFormatting: string) {
		this.str = str;
        this.convertStringToDate(dateFormatting);
        this.daysTillExpired = this.calcDaysTillExpired();
	}

    private convertStringToDate(dateFormatting: string) {
        this.date = this.constructDate(
            dateFormatting.search('DD'),
            dateFormatting.search('MM'),
            dateFormatting.search('YYYY')
        );
    }

    private constructDate(dayIndex: number, monthIndex: number, yearIndex: number): Date {
        const date = new Date();
        date.setFullYear(
            this.dateNumber(yearIndex, yearIndex+4), 
            this.dateNumber(monthIndex, monthIndex+2, 1), // month has one offset
            this.dateNumber(dayIndex, dayIndex+2)
        );
        return date;
    }

    private dateNumber(start: number, end: number, offset?: number): number {
        return parseInt(this.str.substring(start, end)) - (offset ?? 0);
    }

    private calcDaysTillExpired(): number {
        const timeDifference = new Date().getTime() - this.date.getTime();
        const days = -Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return (-days === 0) ? 0 : days;
    }
}