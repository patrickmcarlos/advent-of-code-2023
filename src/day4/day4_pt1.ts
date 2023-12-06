import { data } from './data';

interface CardData {
    id: number;
    winningNumbers: Set<number>;
    myNumbers: Set<number>;
}

const mockData = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const generateNumberSet = (numberStr: string) => {
    const set = new Set<number>();

    numberStr.split(' ').forEach((value) => {
        const parsedValue = parseInt(value.trim());

        if (!isNaN(parsedValue)) {
            set.add(parsedValue);
        }
    });

    return set;
};

const processData = (input: string) => {
    const cardData: CardData[] = [];
    const rows = input.split('\n');

    rows.forEach((row) => {
        const [cardStr, numbersStr] = row.split(':');
        const id = parseInt(cardStr.split('Card')[1].trim());

        const [winningNumbersStr, myNumbersStr] = numbersStr.split('|');

        const winningNumbers = generateNumberSet(winningNumbersStr);
        const myNumbers = generateNumberSet(myNumbersStr);

        cardData.push({
            id,
            winningNumbers,
            myNumbers,
        });
    });

    return cardData;
};

const findScoresFromScratchCards = (cardData: CardData[]) => {
    let totalScore = cardData.reduce((acc, curr) => {
        let numWon = 0;

        const { winningNumbers, myNumbers } = curr;

        for (const myNumber of myNumbers) {
            winningNumbers.has(myNumber) && numWon++;
        }

        if (!numWon) {
            return acc;
        }

        return acc + Math.pow(2, numWon - 1);
    }, 0);

    return totalScore;
};

console.log(findScoresFromScratchCards(processData(data)));
