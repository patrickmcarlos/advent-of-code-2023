import { data } from './data';

interface GameData {
    gameId: number;
    sets: SetData[];
}

interface SetData {
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

const MAX_COLOR_VALUES = {
    red: 12,
    green: 13,
    blue: 14,
};

const isSetValid = (set: SetData) => {
    const exceedsMaximumAllowableCount = Object.entries(set).some(
        ([color, count]) => count > MAX_COLOR_VALUES[color]
    );

    return !exceedsMaximumAllowableCount;
};

const areSetsValid = (sets: SetData[]) => !sets.some((set) => !isSetValid(set));

const calculateSumOfValidGameIds = (games: GameData[]) => {
    const sum = games.reduce((acc, curr) => {
        if (areSetsValid(curr.sets)) {
            return acc + curr.gameId;
        }

        return acc;
    }, 0);

    return sum;
};

console.log(calculateSumOfValidGameIds(processData(data)));
