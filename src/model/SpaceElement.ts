import type ISpaceElementMetadata from './ISpaceElementMetadata';

export default class SpaceElement {
    metadata: ISpaceElementMetadata;
    children: SpaceElement[];
    parent: SpaceElement | null;

    constructor(
        metadata: ISpaceElementMetadata,
        children: SpaceElement[],
        parent: SpaceElement | null,
    ) {
        this.metadata = metadata;
        this.children = children;
        this.parent = parent;
    }

    add(element: SpaceElement) {
        element.parent = this;
        this.children.push(element);
    }

    clone(): SpaceElement {
        return new SpaceElement({ ...this.metadata }, [], null);
    }

    deepClone(): SpaceElement {
        const copy = this.clone();
        copy.children = this.children.map(c => c.deepClone());
        return copy;
    }
}
