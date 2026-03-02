import type ISpaceElementMetadata from './ISpaceElementMetadata';

export default abstract class SpaceElement {
    metadata: ISpaceElementMetadata;
    children: SpaceElement[];

    constructor(metadata: ISpaceElementMetadata, children: SpaceElement[]) {
        this.metadata = metadata;
        this.children = children;
    }

    add(element: SpaceElement) {
        this.children.push(element);
    }

    abstract clone(): SpaceElement;

    deepClone(): SpaceElement {
        const copy = this.clone();
        copy.children = this.children.map(c => c.deepClone());
        return copy;
    }
}

export class SpaceDirectory extends SpaceElement {
    clone(): SpaceElement {
        return new SpaceDirectory(
            { ...this.metadata },
            []
        );
    }
}
