import p5Types from "p5";

export default class Field {
    private _width: number;
    private _height: number;
    private _matrix: boolean[][];
    private readonly _tempMatrix: boolean[][];

    constructor(w: number, h: number) {
        this._width = w;
        this._height = h;
        this._matrix = Field.createMatrix(this._width, this._height);
        this._tempMatrix = new Array<boolean[]>(this._width);
        for (let i = 0; i < this._width; i++) this._tempMatrix[i] = new Array<boolean>(this._height);
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
        this._matrix = Field.createMatrix(this._width, this._height);
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
        this._matrix = Field.createMatrix(this._width, this._height);
    }

    get matrix(): boolean[][] {
        return this._matrix;
    }

    private static createMatrix(w: number, h: number): boolean[][] {
        const matrix = new Array<boolean[]>(w);
        for (let i = 0; i < matrix.length; i++) {
            matrix[i] = new Array<boolean>(h);
            for (let j = 0; j < matrix[i].length; j++)
                matrix[i][j] = Math.random() < 0.2;
        }
        return matrix;
    }

    private aliveNeighbours(i: number, j: number) {
        // (i-1, j-1)   (i, j-1)    (i+1, j-1)
        // (i-1, j)     self(i, j)  (i+1, j)
        // (i-1, j+1)   (i, j+1)    (i+1, j+1)
        const im1 = i - 1;
        const ip1 = i + 1 < this.width ? i + 1 : 0;
        const jm1 = j - 1;
        const jp1 = j + 1 < this.height ? j + 1 : 0;

        let sum: number = this._matrix.at(im1)!.at(jm1)! ? 1 : 0;
        sum += this._matrix.at(i)!.at(jm1)! ? 1 : 0;
        sum += this._matrix.at(ip1)!.at(jm1)! ? 1 : 0;
        sum += this._matrix.at(im1)!.at(j)! ? 1 : 0;
        sum += this._matrix.at(ip1)!.at(j)! ? 1 : 0;
        sum += this._matrix.at(im1)!.at(jp1)! ? 1 : 0;
        sum += this._matrix.at(i)!.at(jp1)! ? 1 : 0;
        sum += this._matrix.at(ip1)!.at(jp1)! ? 1 : 0;
        return sum;
    }

    act() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                const thisAliveNeighbours = this.aliveNeighbours(i, j);
                if (!this._matrix[i][j] && thisAliveNeighbours === 3)
                    this._tempMatrix[i][j] = true;
                else if (this._matrix[i][j] && (thisAliveNeighbours < 2 || thisAliveNeighbours > 3))
                    this._tempMatrix[i][j] = false;
                else this._tempMatrix[i][j] = this._matrix[i][j];
            }
        }

        this._tempMatrix.forEach((newColumn, i) => {
            newColumn.forEach((newElement, j) => {
                this._matrix[i][j] = newElement;
            });
        });
    }

    show(showGrid: boolean, colorMode: "light" | "dark", p5: p5Types) {
        const color = colorMode === "light" ? 0 : 255;
        if (showGrid) {
            for (let x = 0; x < p5.width; x += p5.width / this.width) {
                p5.stroke(color);
                p5.push();
                p5.line(x + 1, 0, x + 1, p5.height);
                p5.pop();
            }
            for (let y = 0; y < p5.height; y += p5.height / this.height) {
                p5.stroke(color);
                p5.push();
                p5.line(0, y + 1, p5.width, y + 1);
                p5.pop();
            }
        }
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.matrix[i][j]) {
                    const w = p5.width / this.width;
                    const h = p5.height / this.height;
                    const x = i * w;
                    const y = j * h;
                    p5.stroke(color);
                    p5.fill(color)
                    p5.push();
                    p5.rect(x+1, y+1, w-1, h-1);
                    p5.pop();
                }
            }
        }
    }

    clear() {
        for (let i = 0; i < this._width; i++) {
            for (let j = 0; j < this._height; j++) {
                this._matrix[i][j] = false;
                this._tempMatrix[i][j] = false;
            }
        }
        console.log("Cleared");
    }

    putCell(i: number, j: number) {
        if (i < 0 || i >= this._width || j < 0 || j >= this._height) return;
        this._matrix[i][j] = !this._matrix[i][j];
    }
}