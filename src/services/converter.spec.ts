import { MeasureItems } from "./converter"
import { SvgItem, ElementType } from "./parsertypes"

function makeItem(x: number, y: number, w: number, children: SvgItem[]): SvgItem {
    return {
        x: x,
        y: y,
        width: w,
        height: 20,
        next: children,
        text: "blah",
        type: ElementType.View
    };
}

describe(`When measuring items`, () => {

    it(`Can measure a simple group`, () => {
        const items:SvgItem[] = [
            makeItem(0, 0, 100, []),
            makeItem(0, 20, 70, []),
            makeItem(0, 45, 110, []),
        ];

        const size = MeasureItems(items);
        expect(size).toMatchObject({
            left: 0,
            top: 0,
            width: 110,
            height: 65
        });
    });

    describe(`When measuring a slightly complex group`, () =>{
        let items:SvgItem[] = [
            makeItem(0, 0, 100, []),
            makeItem(0, 20, 70, [
                makeItem(0, 0, 100, []),
                makeItem(0, 20, 70, []),
                makeItem(0, 45, 110, []),
            ]),
            makeItem(0, 45, 110, []),
        ];

        const size = MeasureItems(items);
        it(`Should calculate the correct size`, ()=>{
            expect(size).toMatchObject({
                left: 0,
                top: 0,
                width: 110 + 100 + 110,
                height: 65
            });
        });

        it(`Should move child items correctly`, () => {
            expect(items[1].next[2].x).toBe(110+100);
            expect(items[1].next[0].y).toBe(items[0].y);
        });
    })

    describe(`When measuring a slightly more complex group`, () =>{
        let items:SvgItem[] = [
            makeItem(0, 0, 100, []),
            makeItem(0, 20, 70, [
                makeItem(0, 0, 100, []),
                makeItem(0, 20, 70, [
                    makeItem(0, 0, 100, []),
                    makeItem(0, 20, 70, []),
                    makeItem(0, 45, 110, []),
                ]),
                makeItem(0, 45, 110, []),
            ]),
            makeItem(0, 45, 110, []),
        ];

        const size = MeasureItems(items);
        it(`Should calculate the correct size`, ()=>{
            expect(size).toMatchObject({
                left: 0,
                top: 0,
                width: 110 + 100 + 110 + 100 + 110,
                height: 65
            });
        });

        it(`Should move child items correctly`, () => {
            expect(items[1].next[1].next[2].x).toBe(110 + 100 + 110 + 100);
            expect(items[1].next[1].next[0].y).toBe(items[0].y);
        });
    })

    describe(`When measuring a group with several different child items`, () =>{
        let items:SvgItem[] = [
            makeItem(0, 0, 100, [
                makeItem(0, 0, 100, []),
                makeItem(0, 20, 70, []),
                makeItem(0, 40, 110, []),
            ]),
            makeItem(0, 20, 70, [
                makeItem(0, 0, 100, []),
                makeItem(0, 20, 70, []),
                makeItem(0, 40, 110, []),
            ]),
            makeItem(0, 40, 110, [
                makeItem(0, 0, 100, []),
                makeItem(0, 20, 70, []),
                makeItem(0, 40, 110, []),
            ]),
        ];

        const size = MeasureItems(items);
        const expectedAllHeight = 60*3 + 50*2;

        it(`Should calculate the correct size`, ()=>{
            expect(size).toMatchObject({
                left: 0,
                top: 30 - (expectedAllHeight /2),
                width: 110 + 100 + 110,
                height: expectedAllHeight
            });
        });

        it(`Should move child items correctly`, () => {
            expect(items[1].next[1].x).toBe(110 + 100);
            expect(items[0].next[0].y).toBe(size.top);
            expect(items[2].next[2].y).toBe(size.top + size.height - 20);
        });
    })
});