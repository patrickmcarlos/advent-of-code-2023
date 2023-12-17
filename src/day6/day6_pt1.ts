import { data } from './data';

interface Race {
    time: number;
    distance: number;
}

const mockData = `Time:      7  15   30
Distance:  9  40  200`;

const getNumbersFromStrs = (str: string) => {
    const rows = str.split(':')[1].trim().split(' ')
    const res = [];

    for (const str of rows) {
        const numberStr = str.trim();

        if (numberStr) {
            res.push(parseInt(numberStr));
        }
    }

    return res;
}

const processData = (input: string) => {
    const [timeStr, distanceStr] = input.split('\n');

    const times: number[] = getNumbersFromStrs(timeStr);
    const distances: number[] = getNumbersFromStrs((distanceStr));

    const res: Race[] = [];

    for (let i = 0; i < times.length; i++) {
        res.push({ time: times[i], distance: distances[i] });
    }

    return res;
};

const calculateNumWaysToBeatRecord = (race: Race) => {
    let numWaysToWin = 0;

    for (let i = 0; i <= race.time; i++) {
        const canWin = i * (race.time - i) > race.distance;

        canWin && numWaysToWin++;
    }

    return numWaysToWin;
};

const calculateTotalWaysToBeatRecord = (races: Race[]) => {
    const totalWaysToWin = races.reduce((acc, curr) => {
        const numWaysToWin = calculateNumWaysToBeatRecord(curr);
        if (acc === 0) {
            return numWaysToWin;
        }

        return acc * numWaysToWin;
    }, 0);

    return totalWaysToWin;
};

console.log(calculateTotalWaysToBeatRecord(processData(data)));
