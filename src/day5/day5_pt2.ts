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
    seedDatum: SeedData[];
    converter: ConverterFn;
}

interface SeedData {
    seed: number;
    range: number;
}

interface MapRow {
    source: number;
    destination: number;
    range: number;
}

const convertSeedStringToSeedDatum = (str: string): SeedData[] => {
    const res: SeedData[] = [];
    const seeds = str.split('seeds: ')[1].split(' ');

    console.log({ seeds });

    for (let i = 0; i < seeds.length; i += 2) {
        const [seed, range] = [seeds[i], seeds[i + 1]].map((num) =>
            parseInt(num)
        );

        res.push({ seed, range });
    }

    return res;
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
    let seedDatum: SeedData[] = [];
    const mappings: MapRow[][] = new Array(7).fill('').map(() => []);

    let mapIndex = 0;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        if (row.slice(0, 5) === 'seeds') {
            seedDatum = convertSeedStringToSeedDatum(row);
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
        seedDatum,
        converter,
    };
};

const findMinimumLocation = ({ seedDatum, converter }: AlmanacData) => {
    let minimumLocation = Infinity;

    for (const { seed, range } of seedDatum) {
        for (let i = seed; i < seed + range; i++) {
            const curr = converter(i);
            minimumLocation = Math.min(minimumLocation, converter(i));

            console.log({ minimumLocation, curr });
        }
    }

    return minimumLocation;
};

const almanacData = generateAlmanacData(data);

console.log(findMinimumLocation(almanacData));
