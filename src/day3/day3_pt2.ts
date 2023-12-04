import { data } from './data';

/*
1. Create a 2D matrix from the input string.

2. Iterate through each element, scanning for asterisks.
If we find an asterisk, see if there's a number above/adjacent, left, or below/adjacent, build the numbers.
As we build the numbers, add the coordinates to a set of visited nodes. This is so we don't build out the same numbers over again.
IFF we find 2 adjacent numbers, we can multiply them together and add it to the sum.

3. Sum the gear numbers together.
*/

const processData = (input: string): string[][] => {
    const rows = input.split('\n');
    const matrix = rows.map((row) => row.split(''));

    return matrix;
};

const findAdjacentValues = (schematic: string[][], i: number, j: number) => {
    const adjacentValues = [];
    const visitedNodes = new Set<string>();

    const top = [i - 1, j];
    const topRight = [i - 1, j + 1];
    const right = [i, j + 1];
    const rightBottom = [i + 1, j + 1];
    const bottom = [i + 1, j];
    const bottomLeft = [i + 1, j - 1];
    const left = [i, j - 1];
    const topLeft = [i - 1, j - 1];

    const values = [
        top,
        topRight,
        right,
        rightBottom,
        bottom,
        bottomLeft,
        left,
        topLeft,
    ];

    for (const [i, j] of values) {
        const numberStr = parseInt(
            findNumberStr(schematic, visitedNodes, i, j)
        );

        if (numberStr && !isNaN(numberStr)) {
            adjacentValues.push(numberStr);
        }
    }

    return adjacentValues;
};

const findNumberStr = (
    schematic: string[][],
    visitedNodes: Set<string>,
    i: number,
    j: number
) => {
    if (visitedNodes.has([i, j].join(','))) {
        return '';
    }

    let currStr = schematic[i]?.[j];

    visitedNodes.add([i, j].join(','));

    if (isNaN(parseInt(currStr))) {
        return '';
    }

    // check values to the left
    let leftJPointer = j - 1;
    let rightJPointer = j + 1;

    while (leftJPointer >= 0) {
        if (!isNaN(parseInt(schematic[i]?.[leftJPointer]))) {
            currStr = schematic[i][leftJPointer] + currStr;
            visitedNodes.add([i, leftJPointer].join(','));
            leftJPointer--;
            continue;
        }

        break;
    }

    while (rightJPointer < schematic[i].length) {
        if (!isNaN(parseInt(schematic[i]?.[rightJPointer]))) {
            currStr += schematic[i][rightJPointer];
            visitedNodes.add([i, rightJPointer].join(','));
            rightJPointer++;
            continue;
        }

        break;
    }

    return currStr;
};

const findSumOfPartNumbers = (schematic: string[][]) => {
    let sum = 0;

    for (let i = 0; i < schematic.length; i++) {
        for (let j = 0; j < schematic[i].length; j++) {
            const curr = schematic[i][j];

            if (curr === '*') {
                const adjacentValues = findAdjacentValues(schematic, i, j);

                if (adjacentValues.length === 2) {
                    sum += adjacentValues.reduce((acc, curr) => acc * curr, 1);
                }
            }
        }
    }

    return sum;
};

console.log(findSumOfPartNumbers(processData(data)));
