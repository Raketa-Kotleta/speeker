import { useMainStore } from '@/store/mainStore';
import { SunbrustGraphic } from './ui/sunbrust/SunbrustGraphic';
import { useState, type WheelEventHandler } from 'react';
import type SpaceElement from '@/model/SpaceElement';
import type { SunbrustNode } from '@/components/ui/sunbrust/SunbrustSegmentLayer'

export interface SunbrustViewerProps {
    className?: string;
}
const [zoomScale, minZoom, maxZoom] = [0.1, 1, 2];

function toSunburstNode(root: SpaceElement): SunbrustNode{
    const rootNode: SunbrustNode = {
        size: root.metadata.size,
        parent: null,
        children: [],
    };

    const stack: Array<{ element: SpaceElement; node: SunbrustNode }> = [
        { element: root, node: rootNode },
    ];

    while (stack.length) {
        const { element, node } = stack.pop()!;

        for (const child of element.children) {
            const childNode: SunbrustNode = {
                size: child.metadata.size,
                parent: node,
                children: [],
            };
            node.children.push(childNode);
            stack.push({ element: child, node: childNode });
        }
    }

    return rootNode;
}

export function SunbrustViewer({ className }: SunbrustViewerProps) {
    const [zoomValue, setZoomValue] = useState(1);
    const current = useMainStore(state => state.current);

    const zoom: WheelEventHandler = e => {
        if (e.deltaY < 0) {
            setZoomValue(value => {
                return value >= maxZoom ? maxZoom : value + zoomScale;
            });
        } else {
            setZoomValue(value => {
                return value <= minZoom ? minZoom : value - zoomScale;
            });
        }
    };
    const [graphRadius, graphSegmentWidth] = [40, 20];
    if (!current) return <h1 className='text-white'>No content!</h1>;

    return (
        <div className={`flex justify-center items-center relative ${className}`} onWheel={zoom}>
            <SunbrustGraphic
                className='flex-1 max-h-full'
                root={toSunburstNode(current)}
                options={{
                    rootRadius: graphRadius * zoomValue,
                    segmentWidth: graphSegmentWidth * zoomValue,
                    maxLayers: 3
                }}
            ></SunbrustGraphic>
        </div>
    );
}
