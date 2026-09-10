import { useMemo } from 'react';
import {
    SunbrustSegmentLayer,
    type SegmentElement,
    type SegmentLayer,
    type SegmentOptions,
    type SunbrustNode,
} from './SunbrustSegmentLayer';

type GraphicOptions = {
    rootRadius: number;
    segmentWidth: number;
    maxLayers?: number;
    segmentOptions?: SegmentOptions
};

export interface SunbrustGraphicProps {
    className?: string;
    root: SunbrustNode;
    options?: GraphicOptions;
}

function buildLayers(
    root: SunbrustNode,
    { rootRadius, segmentWidth, maxLayers = 4, segmentOptions }: GraphicOptions
): SegmentLayer[] {
    const element: SegmentElement = {
        node: root,
        interval: [0, 359],
        id: '-1'
    };

    const rootLayer: SegmentLayer = {
        id: '-1',
        elements: [element],
        innerRadius: rootRadius,
        segmentWidth,
    };

    const layers: SegmentLayer[] = [];
    const stack: SegmentLayer[] = [rootLayer];
    let layerNum = 0;

    while (stack.length && layerNum < maxLayers) {
        layerNum++;
        
        const currentLayer = stack.pop()!;
        const layer: SegmentLayer = {
            id: String(layerNum),
            elements: [],
            innerRadius: currentLayer.innerRadius + segmentWidth + 2,
            segmentWidth: segmentWidth,
            segmentOptions,
        };
        for (const elementIndex in currentLayer.elements) {
            const element = currentLayer.elements[elementIndex];
            const totalRange = element.interval[1] - element.interval[0];
            const children = element.node.children;

            if (!children.length) continue;

            let intervalShift = element.interval[0];

            children.forEach((node, i) => {
                const interval = (node.size / element.node.size) * totalRange
                if (interval < 0.5) return;

                const childSegment: SegmentElement = {
                    node: node,
                    interval: [intervalShift, intervalShift + interval],
                    id: `${layerNum}.${elementIndex}.${i}`
                };
                layer.elements.push(childSegment);
                intervalShift += interval;
            });
        }

        if (layer.elements.length) {
            layers.push(layer);
            stack.push(layer);
        }
    }

    return layers;
}

export function SunbrustGraphic({
    className = '',
    root,
    options = { rootRadius: 20, segmentWidth: 10 },
}: SunbrustGraphicProps) {
    const layers = buildLayers(root, options);

    const segemntsContent = useMemo(
        () =>
            layers.map(layer => {
                return (
                    <SunbrustSegmentLayer
                        layer={layer}
                        key={layer.id}
                    ></SunbrustSegmentLayer>
                );
            }),
        [layers]
    );
    return (
        <svg viewBox='-300 -300 600 600' className={className}>
            <circle r={options.rootRadius} fill='var(--color-zinc-900)' />
            {segemntsContent}
        </svg>
    );
}
