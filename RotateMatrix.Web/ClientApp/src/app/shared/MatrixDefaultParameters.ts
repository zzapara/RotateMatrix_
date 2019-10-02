
export class MatrixDefaultParameters {
    minRank = 2;
    maxRank = 10;
    rankValueDefault = 6;
    minValue = 0;
    maxValue = 1000;

    isParameterOk(name: string, value: number): boolean {
        if (name === 'minValue') {
            return value > this.minValue;
        }
        if (name === 'maxValue') {
            return value < this.maxValue && value > this.minValue;
        }
    }
}