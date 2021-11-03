import { convertToSvg, extractElements, ElementType } from "./parser";

describe("Parsing a string to element structure", ()=> {

    it(`can parse a simple structure`, ()=>{

        const simple = `Some view
 - First Action
 - Second Action`;

        const expected = [{
            text: "Some view",
            type: ElementType.View,
            children: [
                {
                    text: "First Action",
                    type: ElementType.Action,
                    children: []
                },
                {
                    text: "Second Action",
                    type: ElementType.Action,
                    children: []
                },
            ]
        }];

        const result = extractElements(simple);
        console.log(JSON.stringify(result));
        expect(result).toMatchObject(expected);
    });

    it(`can parse a structure with newlines`, ()=>{

        const simple = `Some view
 - First Action

 - Second Action
 `;

        const expected = [{
            text: "Some view",
            type: ElementType.View,
            children: [
                {
                    text: "First Action",
                    type: ElementType.Action,
                    children: []
                },
                {
                    text: "Second Action",
                    type: ElementType.Action,
                    children: []
                },
            ]
        }];

        const result = extractElements(simple);
        console.log(JSON.stringify(result));
        expect(result).toMatchObject(expected);
    });

    
    it(`can parse a slightly nested structure`, ()=>{

        const simple = `Some view
 - First Action
  -> Child of first
   - Child of child of first
 - Second Action
 `;

        const expected = [{
            text: "Some view",
            type: ElementType.View,
            children: [
                {
                    text: "First Action",
                    type: ElementType.Action,
                    children: [ {
                        text: "Child of first",
                        type: ElementType.View,
                        children: [ {
                            text: "Child of child of first",
                            type: ElementType.Action,
                            children: []
                        }]
                    }]
                },
                {
                    text: "Second Action",
                    type: ElementType.Action,
                    children: []
                },
            ]
        }];

        const result = extractElements(simple);
        console.log(JSON.stringify(result));
        expect(result).toMatchObject(expected);
    });

    it(`can handle multi spaces`, ()=>{

        const simple = `
Some view
    - First Action
        ->  Child of first
            - Child of child of first
    - Second Action
`;

        const expected = [{
            text: "Some view",
            type: ElementType.View,
            children: [
                {
                    text: "First Action",
                    type: ElementType.Action,
                    children: [ {
                        text: "Child of first",
                        type: ElementType.View,
                        children: [ {
                            text: "Child of child of first",
                            type: ElementType.Action,
                            children: []
                        }]
                    }]
                },
                {
                    text: "Second Action",
                    type: ElementType.Action,
                    children: []
                },
            ]
        }];

        const result = extractElements(simple);
        console.log(JSON.stringify(result));
        expect(result).toMatchObject(expected);
    });
});

describe('Parsing a string to svg', () => {

    it(`should create a svg element`, () => {
        const expected = `<svg xmlns="http://www.w3.org/2000/svg">
</svg>`;
        
        const result = convertToSvg("");
        
        expect(result).toBe(expected);
    });


});