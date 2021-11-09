import { SvgItem, ElementType, Element } from "./parsertypes";
import { char_width, convert, hspacing, line_height, measureAndMoveItems, vspacing } from "./converter";

function makeItem(
    x: number,
    y: number,
    w: number,
    children: SvgItem[],
): SvgItem {
    return {
        x: x,
        y: y,
        width: w,
        height: 20,
        next: children,
        text: "blah",
        type: ElementType.View,
    };
}

describe(`When measuring items`, () => {
    it(`Can measure a simple group`, () => {
        const items: SvgItem[] = [
            makeItem(0, 0, 100, []),
            makeItem(0, 20, 70, []),
            makeItem(0, 45, 110, []),
        ];

        const size = measureAndMoveItems(items);
        expect(size).toMatchObject({
            left: 0,
            top: 0,
            right: 110,
            bottom: 65,
        });
    });

    describe(`When measuring a slightly complex group`, () => {
        let items: SvgItem[] = [
            makeItem(0, 0, 100, []),
            makeItem(0, 20, 70, [
                makeItem(0, 0, 100, []),
                makeItem(0, 20, 70, []),
                makeItem(0, 45, 110, []),
            ]),
            makeItem(0, 45, 110, []),
        ];

        const size = measureAndMoveItems(items);
        it(`Should calculate the correct size`, () => {
            expect(size).toMatchObject({
                left: 0,
                top: 0,
                right: 110 + hspacing + 110,
                bottom: 65,
            });
        });

        it(`Should move child items correctly`, () => {
            expect(items[1].next[2].x).toBe(110 + hspacing);
            expect(items[1].next[0].y).toBe(items[0].y);
        });
    });

    describe(`When measuring a slightly more complex group`, () => {
        let items: SvgItem[] = [
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

        const size = measureAndMoveItems(items);
        it(`Should calculate the correct size`, () => {
            expect(size).toMatchObject({
                left: 0,
                top: 0,
                right: 110 + hspacing + 110 + hspacing + 110,
                bottom: 65,
            });
        });

        it(`Should move child items correctly`, () => {
            expect(items[1].next[1].next[2].x).toBe(110 + hspacing + 110 + hspacing);
            expect(items[1].next[1].next[0].y).toBe(items[0].y);
        });
    });

    describe(`When measuring a group with several different child items`, () => {
        let items: SvgItem[] = [
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

        // - 1 box of 3 items at (0,0, 110, 60)
        // - 3 boxes of the same size: total 240 height
        //   - 1st box at (140, -90)
        //   - 2nd box at (140, 0)
        //   - 3rd box at (130, 90)

        const size = measureAndMoveItems(items);
        const expectedAllHeight = 60 * 3 + vspacing * 2;

        it(`Should calculate the correct size`, () => {
            expect(size).toMatchObject({
                left: 0,
                top: 30 - expectedAllHeight / 2,
                right: 110 + hspacing + 110,
                bottom: expectedAllHeight/2 + 30,
            });
        });

        it(`Should move child items correctly`, () => {
            expect(items[0].next[0].y).toBe(size.top);
            expect(items[1].next[1].x).toBe(110 + hspacing);
            expect(items[2].next[2].y).toBe(size.bottom - 20);
        });
    });
});

describe(`When converting Elements to SvgElements`, () => {
    it(`Can convert a simple element list`, () => {
        const elements: Element[] = [
            {
                type: ElementType.View,
                text: "first view",
                children: [
                    {
                        type: ElementType.Action,
                        text: "first action",
                        children: [],
                    },
                    {
                        type: ElementType.Action,
                        text: "second action",
                        children: [],
                    },
                ],
            },
        ];

        const result = convert(0, 0, elements);
        expect(result.items).toMatchObject([
            {
                text: "first view",
                type: ElementType.View,
                x: 0,
                y: 0,
                width: "first view".length * char_width,
                height: line_height,
                next: [],
            },
            {
                text: "first action",
                type: ElementType.Action,
                x: 0,
                y: line_height,
                width: "first action".length * char_width,
                height: line_height,
                next: [],
            },
            {
                text: "second action",
                type: ElementType.Action,
                x: 0,
                y: line_height*2,
                width: "second action".length * char_width,
                height: line_height,
                next: [],
            },
        ]);
    });

    it(`Can convert a nested element list`, () => {
        const elements: Element[] = [
            {
                type: ElementType.View,
                text: "first view",
                children: [
                    {
                        type: ElementType.Action,
                        text: "first action",
                        children: [
                            {
                                type: ElementType.View,
                                text: "second view",
                                children: [
                                    {
                                        type: ElementType.Action,
                                        text: "first action on second view",
                                        children: [],
                                    },
                                    {
                                        type: ElementType.Action,
                                        text: "second action on second view",
                                        children: [],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        type: ElementType.Action,
                        text: "second action",
                        children: [],
                    },
                ],
            },
        ];

        const result = convert(0, 0, elements);
        expect(result.items).toMatchObject([
            {
                text: "first view",
                type: ElementType.View,
                width: "first view".length * char_width,
                height: line_height,
                next: [],
            },
            {
                text: "first action",
                type: ElementType.Action,
                width: "first action".length * char_width,
                height: line_height,
                next: [
                    {
                        text: "second view",
                        type: ElementType.View,
                        width: "second view".length * char_width,
                        height: line_height,
                        next: [],
                    },
                    {
                        text: "first action on second view",
                        type: ElementType.Action,
                        width: "first action on second view".length * char_width,
                        height: line_height,
                        next: [],
                    },
                    {
                        text: "second action on second view",
                        type: ElementType.Action,
                        width: "second action on second view".length * char_width,
                        height: line_height,
                        next: [],
                    },
                ],
            },
            {
                text: "second action",
                type: ElementType.Action,
                width: "second action".length * char_width,
                height: line_height,
                next: [],
            },
        ]);
    });
});
