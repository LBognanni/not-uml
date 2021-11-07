import { extractElements } from "./parser";
import { ElementType } from "./parsertypes";

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

    
    it(`can handle a slightly more complex structure`, ()=>{

        const simple = `
 Some view
    - First Action
        ->  Child of first
            - Child of child of first
    - Second Action
        -> Child of Second
            - Action 1
            - Action 2
        -> Second of Second
            - Action 1
            - Action2
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
                    children: [
                        {
                            text: "Child of Second",
                            type: ElementType.View,
                            children: [ 
                                {
                                    text: "Action 1",
                                    type: ElementType.Action,
                                    children: []
                                },                            {
                                    text: "Action 2",
                                    type: ElementType.Action,
                                    children: []
                                },
                            ]
                        },    
                        {
                            text: "Second of Second",
                            type: ElementType.View,
                            children: [ 
                                {
                                    text: "Action 1",
                                    type: ElementType.Action,
                                    children: []
                                },                            {
                                    text: "Action2",
                                    type: ElementType.Action,
                                    children: []
                                },
                            ]
                        },  
                    ]
                },
            ]
        }];

        const result = extractElements(simple);
        console.log(JSON.stringify(result));
        expect(result).toMatchObject(expected);
    });
});