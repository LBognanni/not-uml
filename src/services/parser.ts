enum ElementType {
    Root,
    View,
    Action
}

interface Element {
    text: string;
    type: ElementType;
    children: Element[];
}

function createElement(line : string): Element{
    if(line.startsWith("- "))
    {
        return {
            text: line.substring(2).trimStart(),
            type: ElementType.Action,
            children: []
        };
    }
    else if (line.startsWith("-> "))
    {
        return {
            text: line.substring(3).trimStart(),
            type: ElementType.View,
            children: []
        }
    }

    return {
        text: line,
        type: ElementType.View,
        children: []
    };
}

function extractElements(text:string): Element[] {
    
    const root: Element = {
        text: "[root]",
        type: ElementType.Root,
        children: []
    };
    
    const lines = text.split('\n');
    let previousSpaces = 0;
    let previousElements = [root];
    let previousParents = [root];
    
    for(const line of lines)
    {
        if(line.trim() === "")
            continue;

        const spaces = (line.match(/^\s+/) ?? [""])[0].length ?? 0;
        const el = createElement(line.trim());
        if(spaces > previousSpaces)
        {
            // Child of previous el
            const previous = previousElements.slice(-1)[0];
            previous.children.push(el);
            previousElements.push(previous);
            previousParents.push(previous);
        }
        else
        {
            // Sibling of previous or sibling of one of previous' parents
            while(spaces < previousSpaces)
            {
                previousParents.pop();
                previousSpaces--;
            }
            const previous = previousParents.slice(-1)[0];
            previous.children.push(el);
        }
        previousElements.push(el);
        previousSpaces = spaces;
    }

    return root.children;
}


function convertToSvg(text:string) {
    return `<svg xmlns="http://www.w3.org/2000/svg">
</svg>`
}

export {convertToSvg, extractElements, ElementType};