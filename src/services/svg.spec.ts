import { ElementType, SvgItem } from "./parsertypes";
import { convertToSvg, itemsToSvg } from "./svg";

describe(`When converting items to svg string`, () => {
    it(`Should create a simple svg item`, () => {
        const items: SvgItem[] = [
            {
                x: 0,
                y: 0,
                text: "hello",
                height: 0,
                next: [],
                type: ElementType.Root,
                width: 0
            }
        ];
        const result = itemsToSvg(items);
        expect(result).toBe(`<g>
<text x="0" y="0" font-size="10">hello</text>
</g>`);
    });
    
    it(`Should handle nested items`, () => {
        const items: SvgItem[] = [
            {
                x: 0,
                y: 0,
                text: "hello",
                height: 0,
                next: [{
                    x: 100,
                    y: 0,
                    text: "hi",
                    height: 0,
                    width: 0,
                    next: [],
                    type: ElementType.Action
                }],
                type: ElementType.Action,
                width: 0
            }
        ];
        const result = itemsToSvg(items);
        expect(result).toBe(`<g>
<text x="0" y="0" font-size="10">hello</text>
</g>
<g>
<text x="100" y="0" font-size="10">hi</text>
</g>`);
    });

    it("Should have a solid line under view types", () => {
        const items: SvgItem[] = [
            {
                x: 0,
                y: 0,
                text: "hello",
                height: 15,
                next: [],
                type: ElementType.View,
                width: 0
            }
        ];
        const result = itemsToSvg(items);
        expect(result).toBe(`<g>
<text x="0" y="0" font-size="10">hello</text>
<path d="m0 12.5 h${("hello".length * 10)}" stroke="#000" stroke-width="2" fill="none"/>
</g>`);
    })
});


describe('When parsing a string to svg', () => {

    it(`should create a svg element`, () => {
        const expected = `<svg xmlns="http://www.w3.org/2000/svg">
</svg>`;
        
        const result = convertToSvg("");
        
        expect(result).toBe(expected);
    });

});