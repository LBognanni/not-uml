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

interface SvgItem {
    text: string;
    type: ElementType;
    x: number;
    y: number;
    width: number;
    height: number;
    next: SvgItem[];
}

interface Size {
    width: number;
    height: number;
}

interface BoundingBox {
    left: number;
    top: number;
    width: number;
    height: number;
}

export { ElementType, Element, SvgItem, Size, BoundingBox};