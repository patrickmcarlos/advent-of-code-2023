import { data } from './data';

const exampleData = `12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56`;

/*
1. Create a 2D matrix from the input string.

2. Iterate through each element starting from the top row. If we find a number (or contiguous set of numbers),
then we will check all the neighbours to see if a symbol is adjacent to it.
For a set of contiguous numbers we just need to find 1 adjacent symbol for any of the numbers.

3. Sum the part numbers together.
*/

const processData = (input: string): string[][] => {
    const rows = input.split('\n');
    const matrix = rows.map((row) => row.split(''));

    return matrix;
};

const SYMBOL_DENY_LIST = new Set(['.']);

const hasAdjacentSymbol = (schematic: string[][], i: number, j: number) => {
    const top = schematic[i - 1]?.[j];
    const topRight = schematic[i - 1]?.[j + 1];
    const right = schematic[i]?.[j + 1];
    const rightBottom = schematic[i + 1]?.[j + 1];
    const bottom = schematic[i + 1]?.[j];
    const bottomLeft = schematic[i + 1]?.[j - 1];
    const left = schematic[i]?.[j - 1];
    const topLeft = schematic[i - 1]?.[j - 1];

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

    const isSymbol = values.some(
        (value) =>
            value !== undefined &&
            isNaN(parseInt(value)) &&
            !SYMBOL_DENY_LIST.has(value)
    );

    return isSymbol;
};

const findSumOfPartNumbers = (schematic: string[][]) => {
    let sum = 0;

    for (let i = 0; i < schematic.length; i++) {
        let currNumStr = '';
        let isSymbolAdjacent = false;

        for (let j = 0; j < schematic[i].length; j++) {
            const curr = schematic[i][j];

            if (!isNaN(parseInt(curr))) {
                currNumStr += curr;

                if (hasAdjacentSymbol(schematic, i, j)) {
                    isSymbolAdjacent = true;
                }
            } else {
                const isPartNumber = currNumStr && isSymbolAdjacent;

                sum += isPartNumber ? parseInt(currNumStr) : 0;
                currNumStr = '';
                isSymbolAdjacent = false;
            }
        }

        if (!isNaN(parseInt(currNumStr)) && isSymbolAdjacent) {
            sum += parseInt(currNumStr);
        }
    }

    return sum;
};

// const schematic = processData(exampleData);
// console.log(hasAdjacentSymbol(schematic, 0, 7));

console.log(findSumOfPartNumbers(processData(data)));
