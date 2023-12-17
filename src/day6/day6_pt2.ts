import { data } from './data';

interface Race {
    time: number;
    distance: number;
}

const mockData = `Time:      7  15   30
Distance:  9  40  200`;

const getNumbersFromStrs = (str: string) => {
    const rows = str.split(':')[1].trim().split(' ');
    const res = [];

    for (const str of rows) {
        const numberStr = str.trim();

        if (numberStr) {
            res.push(parseInt(numberStr));
        }
    }

    const num = parseInt(res.join(''));

    return num;
};

const processData = (input: string) => {
    const [timeStr, distanceStr] = input.split('\n');

    const time: number = getNumbersFromStrs(timeStr);
    const distance: number = getNumbersFromStrs(distanceStr);

    return { time, distance };
};

const calculateNumWaysToBeatRecord = (race: Race) => {
    let numWaysToWin = 0;

    for (let i = 0; i <= race.time; i++) {
        const canWin = i * (race.time - i) > race.distance;

        canWin && numWaysToWin++;
    }

    return numWaysToWin;
};

console.log(calculateNumWaysToBeatRecord(processData(data)));
