import { data } from './data';

interface GameData {
    gameId: number;
    sets: ColorValues[];
}

interface ColorValues {
    red: number;
    blue: number;
    green: number;
}

const processData = (input: string): GameData[] => {
    const res = input.split('\n').map((row) => {
        const [gameString, setStrings] = row.split(': ');

        const gameId = parseInt(gameString.split(' ')[1]);

        const sets = setStrings.split('; ').map((setString) => {
            const set = {
                red: 0,
                blue: 0,
                green: 0,
            };

            const cubes = setString.split(', ');

            cubes.forEach((cubeStr) => {
                const [num, color] = cubeStr.split(' ');
                set[color] = num;
            });

            return set;
        });

        return {
            gameId,
            sets,
        };
    });

    return res;
};

const calculateMinColorValues = (sets: ColorValues[]) => {
    const minValues: ColorValues = {
        red: 0,
        blue: 0,
        green: 0,
    };

    for (const set of sets) {
        Object.entries(set).forEach(([color, count]) => {
            minValues[color] = Math.max(count, minValues[color]);
        });
    }

    return minValues;
};

const calculatePowerSet = (counts: ColorValues) =>
    Object.values(counts).reduce((acc, curr) => acc * curr, 1);

const calculateSumOfPowerSets = (games: GameData[]) => {
    const sum = games.reduce((acc, curr) => {
        const minValues = calculateMinColorValues(curr.sets);

        return acc + calculatePowerSet(minValues);
    }, 0);

    return sum;
};

console.log(calculateSumOfPowerSets(processData(data)));
