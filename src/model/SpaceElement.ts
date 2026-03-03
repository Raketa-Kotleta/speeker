import type ISpaceElementMetadata from './ISpaceElementMetadata';

export default class SpaceElement {
    metadata: ISpaceElementMetadata;
    children: SpaceElement[];
    parent: SpaceElement | null;
    type: 'directory' | 'file';

    constructor(
        metadata: ISpaceElementMetadata,
        children: SpaceElement[],
        parent: SpaceElement | null,
        type: 'directory' | 'file'
    ) {
        this.metadata = metadata;
        this.children = children;
        this.parent = parent;
        this.type = type;
    }

    add(element: SpaceElement) {
        element.parent = this;
        this.children.push(element);
    }

    clone(): SpaceElement {
        return new SpaceElement({ ...this.metadata }, [], null, this.type);
    }

    deepClone(): SpaceElement {
        const copy = this.clone();
        copy.children = this.children.map(c => c.deepClone());
        return copy;
    }
}
