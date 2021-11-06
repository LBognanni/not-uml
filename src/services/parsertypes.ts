enum ElementType {
    Root,
    View,
    Action
};

interface Element {
    text: string;
    type: ElementType;
    children: Element[];
};

interface ElementAndSpaces {
    spaces: number;
    element: Element;
};

export { ElementType, Element, ElementAndSpaces};