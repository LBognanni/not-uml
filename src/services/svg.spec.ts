import { convertToSvg } from "./svg";

describe('When parsing a string to svg', () => {

    it(`should create a svg element`, () => {
        const expected = `<svg xmlns="http://www.w3.org/2000/svg">
</svg>`;
        
        const result = convertToSvg("");
        
        expect(result).toBe(expected);
    });


});