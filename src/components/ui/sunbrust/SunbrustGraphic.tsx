import { useMemo } from 'react';
import { SunbrustSegmentLayer, type SegmentElement, type SegmentLayer, type SunbrustNode } from './SunbrustSegmentLayer';

type GraphicOptions = {
    rootRadius: number;
    segmentWidth: number;
};

export interface SunbrustGraphicProps {
    className?: string;
    root: SunbrustNode;
    options?: GraphicOptions;
}

function buildLayers(root: SunbrustNode, { rootRadius, segmentWidth }: GraphicOptions): SegmentLayer[] {
    const element: SegmentElement = {
        node: root,
        interval: [0, 359]
    }
    
    const rootLayer: SegmentLayer = {
        elements: [element],
        innerRadius: rootRadius,
        segmentWidth,
    };

    const layers: SegmentLayer[] = [];
    const stack: SegmentLayer[] = [rootLayer];
    
    while (stack.length) {
        const currentLayer = stack.pop()!;
        const layer: SegmentLayer = {
                elements: [],
                innerRadius: currentLayer.innerRadius + segmentWidth + 2,
                segmentWidth: segmentWidth,
            }
        for (const element of currentLayer.elements) {
            const totalRange = element.interval[1] - element.interval[0];
            const children = element.node.children;

            if (!children.length) continue;

            const raw = children.map(
                el => (el.size / element.node.size) * totalRange
            );

            // let stolen = 0;
            // const clamped = raw.map(interval => {
            //     if (interval < 2) {
            //         stolen += 2 - interval;
            //         return 2;
            //     }
            //     return interval;
            // });

            // const bigTotal = raw.reduce((sum, v) => sum + (v >= 1 ? v : 0), 0);

            // const final = clamped.map((interval, i) => {
            //     if (raw[i] >= 1 && bigTotal > 0) {
            //         return interval - stolen * (raw[i] / bigTotal);
            //     }
            //     return interval;
            // });

            let intervalShift = element.interval[0];
            
            children.forEach((element, i) => {
                const childSegment: SegmentElement = {
                    node: element,
                    interval: [intervalShift, intervalShift + final[i]],
                };
                layer.elements.push(childSegment)
                intervalShift += final[i];
            });
        }

        layers.push(layer);
        stack.push(layer);
    }

    return layers;
}


export function SunbrustGraphic({
    className = '',
    root,
    options = { rootRadius: 20, segmentWidth: 10 },
}: SunbrustGraphicProps) {
    const segemntsContent = useMemo(
        () =>
            buildLayers(root, options).map(layer => {
                return (
                    <SunbrustSegmentLayer layer={layer} key={'segement' + layer.innerRadius}></SunbrustSegmentLayer>
                );
            }),
        [root, options]
    );
    return (
        <svg viewBox='-300 -300 600 600' className={className}>
            <circle r={options.rootRadius} fill='var(--color-zinc-900)' />
            {segemntsContent}
        </svg>
    );
}
