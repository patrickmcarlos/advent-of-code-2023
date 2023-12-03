import { data } from './data';

const processData = (input: string) => {
    const rows = input.split('\n');
    return rows;
};

const numberDict = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    1: '1',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
};

const extractNumberFromString = (str: string) => {
    let leftFirstPointer = 0;
    let leftSecondPointer = leftFirstPointer + 3;
    let rightFirstPointer = str.length;
    let rightSecondPointer = rightFirstPointer - 3;

    while (true) {
        // check if the left and right pointers themselves are actually numbers
        if (!isNaN(parseInt(str.charAt(leftFirstPointer)))) {
            leftSecondPointer = leftFirstPointer + 1;
        }

        if (!isNaN(parseInt(str.charAt(rightFirstPointer)))) {
            rightSecondPointer = rightFirstPointer;
            rightFirstPointer = rightSecondPointer + 1;
        }

        // check if the current pointers form a number present in the dictionary
        const leftStr =
            numberDict[str.slice(leftFirstPointer, leftSecondPointer)];
        const rightStr =
            numberDict[str.slice(rightSecondPointer, rightFirstPointer)];

        const isLeftNaN = isNaN(Number(leftStr));
        const isRightNaN = isNaN(Number(rightStr));

        if (!isLeftNaN && !isRightNaN) {
            break;
        }

        if (isLeftNaN) {
            if (leftSecondPointer - leftFirstPointer >= 5) {
                leftFirstPointer += 1;
                leftSecondPointer = leftFirstPointer + 3;
            } else {
                leftSecondPointer++;
            }
        }

        if (isRightNaN) {
            if (rightFirstPointer - rightSecondPointer >= 5) {
                rightFirstPointer -= 1;
                rightSecondPointer = rightFirstPointer - 3;
            } else {
                rightSecondPointer--;
            }
        }
    }

    const sum =
        numberDict[str.slice(leftFirstPointer, leftSecondPointer)] +
        numberDict[str.slice(rightSecondPointer, rightFirstPointer)];

    return parseInt(sum);
};

const findSumOfDigits = (input: string[]) => {
    const calculateSum = (acc: number, curr: string): number =>
        acc + extractNumberFromString(curr);

    const sum = input.reduce(calculateSum, 0);

    return sum;
};

console.log(findSumOfDigits(processData(data)));
