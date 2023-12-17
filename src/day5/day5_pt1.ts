import { data } from './data';

type ConverterFn = (seed: number) => number;

const mockData = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

interface AlmanacData {
    seeds: number[];
    converter: ConverterFn;
}

interface MapRow {
    source: number;
    destination: number;
    range: number;
}

const convertSeedStringToSeedArray = (str: string): number[] => {
    const seeds = str
        .split('seeds: ')[1]
        .split(' ')
        .map((str) => parseInt(str));

    return seeds;
};

const convertMappingsToConverterFn = (
    mapRows: MapRow[]
): ((num: number) => number) => {
    const convertNumber = (num: number) => {
        for (const { source, destination, range } of mapRows) {
            if (num >= source && num < source + range) {
                return Math.abs(num - source) + destination;
            }
        }

        return num;
    };

    return convertNumber;
};

const generateAlmanacData = (input: string): AlmanacData => {
    const rows = input.split('\n');
    let seeds: number[] = [];
    const mappings: MapRow[][] = new Array(7).fill('').map(() => []);

    let mapIndex = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        if (row.slice(0, 5) === 'seeds') {
            seeds = convertSeedStringToSeedArray(row);
            i += 2;
            continue;
        }

        if (row) {
            const [destination, source, range] = row
                .split(' ')
                .map((str) => parseInt(str));

            mappings[mapIndex].push({ source, destination, range });
        } else {
            mapIndex++;
            i++;
            continue;
        }
    }

    const converterFns = mappings.map(convertMappingsToConverterFn);

    const converter = (num: number) =>
        converterFns.reduce((acc, curr) => curr(acc), num);

    return {
        seeds,
        converter,
    };
};

const findMinimumLocation = ({ seeds, converter }: AlmanacData) => {
    const minimumLocation = Math.min(...seeds.map(converter));

    return minimumLocation;
};

const almanacData = generateAlmanacData(data);

console.log(findMinimumLocation(almanacData));
