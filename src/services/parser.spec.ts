import { convertToSvg } from "./parser";

describe('Parsing a string to svg', () => {

    const fullDiagram = `
view
    - action 1
        -> view 2
            - action 2.1
            - action 2.2 
    - action 2
        -> view 3
            - action 3.1
            - action 3.2
`;

    it(`should create a svg element`, () => {
        const expected = `<svg xmlns="http://www.w3.org/2000/svg">
</svg>`;
        
        const result = convertToSvg("");
        
        expect(result).toBe(expected);
    });

    it("should parse a single view", () => {

        const expected = `<svg xmlns="http://www.w3.org/2000/svg">
<g>
</g>
</svg>`;
    });

})