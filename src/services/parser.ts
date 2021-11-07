import { ElementType, Element } from "./parsertypes";

interface ElementAndSpaces {
    spaces: number;
    element: Element;
}

function createElement(line: string): Element {
    if (line.startsWith("- ")) {
        return {
            text: line.substring(2).trimStart(),
            type: ElementType.Action,
            children: [],
        };
    } else if (line.startsWith("-> ")) {
        return {
            text: line.substring(3).trimStart(),
            type: ElementType.View,
            children: [],
        };
    }

    return {
        text: line,
        type: ElementType.View,
        children: [],
    };
}

function findAllElements(lines: string[]): ElementAndSpaces[] {
    const elements = [];

    for (const line of lines) {
        if (line.trim() === "") continue;

        const spaces = (line.match(/^\s+/) ?? [""])[0].length ?? 0;
        const element = createElement(line.trim());

        elements.push({ spaces, element });
    }

    return elements;
}

function mergeElements(items: ElementAndSpaces[]): Element {
    const root: Element = {
        text: "[root]",
        type: ElementType.Root,
        children: [],
    };
    const rootItem = { spaces: 0, element: root };

    let previousItems: ElementAndSpaces[] = [rootItem];
    for (const item of items) {
        let parent =
            previousItems.filter((x) => x.spaces < item.spaces)?.shift() ??
            rootItem;
        parent.element.children.push(item.element);
        previousItems.unshift(item);
    }

    return root;
}

function extractElements(text: string): Element[] {
    const lines = text.split("\n");

    const elements = findAllElements(lines);

    return mergeElements(elements).children;
}

export { extractElements };
