import { data } from './data';

const processData = (input: string) => {
    const rows = input.split('\n');
    return rows;
};

const extractNumberFromString = (str: string) => {
    let left = 0;
    let right = str.length - 1;

    while (left <= right) {
        const isLeftNaN = isNaN(Number(str.charAt(left)));
        const isRightNaN = isNaN(Number(str.charAt(right)));

        if (!isLeftNaN && !isRightNaN) {
            break;
        }

        if (isLeftNaN) {
            left++;
        }

        if (isRightNaN) {
            right--;
        }
    }

    return Number(str.charAt(left) + str.charAt(right));
};

const findSumOfDigits = (input: string[]) => {
    const calculateSum = (acc: number, curr: string): number =>
        acc + extractNumberFromString(curr);

    const sum = input.reduce(calculateSum, 0);

    return sum;
};

console.log(findSumOfDigits(processData(data)));
