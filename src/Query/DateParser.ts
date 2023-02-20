import * as chrono from 'chrono-node';
import type moment from 'moment';

export class DateParser {
    public static parseDate(input: string, forwardDate: boolean = false): moment.Moment {
        // Using start of day to correctly match on comparison with other dates (like equality).
        return window
            .moment(
                chrono.parseDate(input, undefined, {
                    forwardDate: forwardDate,
                }),
            )
            .startOf('day');
    }

    /**
     * Parse a line and extract a pair of dates, returned in a tuple
     * @param input - any pair of dates, separate by a hyphen '17 August 2013 - 19 August 2013',
     *                or a single date
     */
    public static parseDateRange(input: string): [moment.Moment, moment.Moment] {
        const result = chrono.parse(input, undefined, {
            forwardDate: true,
        });

        const start = result[0].start;
        const end = result[0].end ? result[0].end : start;
        return [window.moment(start.date()), window.moment(end.date())];
    }
}
