import ColorUtils from '@/utils/colors';
import { type MouseEventHandler, type ReactNode } from 'react';
export interface SunbrustNode {
    parent: SunbrustNode | null;
    children: SunbrustNode[];
    size: number;
}

export interface SegmentElement {
    node: SunbrustNode;
    interval: [number, number];
}

export interface SegmentOptions {
    onClick?: MouseEventHandler;
    onHover?: MouseEventHandler;
}

export interface SegmentLayer {
    elements: SegmentElement[];
    segmentOptions?: SegmentOptions;
    innerRadius: number;
    segmentWidth: number;
}

export interface SunbrustSegmentLayerProps {
    layer: SegmentLayer;
}

function makeArcPath(
    startAngle: number,
    endAngle: number,
    innerRadius: number,
    width: number
): string {
    const radk = 0.0174533;
    const startAngleRad = startAngle * radk;
    const endAngleRad = endAngle * radk;
    const outerRadius = innerRadius - width;
    const pointOnCircle = (angle: number, radius: number) => [
        Math.cos(angle - Math.PI / 2) * radius,
        Math.sin(angle - Math.PI / 2) * radius,
    ];

    const [outerStartX, outerStartY] = pointOnCircle(startAngleRad, outerRadius);
    const [outerEndX, outerEndY] = pointOnCircle(endAngleRad, outerRadius);
    const [innerEndX, innerEndY] = pointOnCircle(endAngleRad, innerRadius);
    const [innerStartX, innerStartY] = pointOnCircle(startAngleRad, innerRadius);

    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return [
        `M ${outerStartX} ${outerStartY}`,
        `A ${outerRadius} ${outerRadius} 0 ${largeArcFlag} 1 ${outerEndX} ${outerEndY}`,
        `L ${innerEndX} ${innerEndY}`,
        `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
        `Z`,
    ].join(' ');
}

export function SunbrustSegmentLayer({ layer }: SunbrustSegmentLayerProps) {
    const content: ReactNode = layer.elements.map(element => {
        return (
            <path
                d={makeArcPath(
                    element.interval[0],
                    element.interval[1],
                    layer.innerRadius,
                    layer.segmentWidth
                )}
                stroke='black'
                fill={ColorUtils.getColor(
                    element.node.parent?.children.indexOf(element.node) ?? 1,
                    element.node.parent?.children.length ?? 1
                )}
                fill-opacity='0.6'
                onClick={layer.segmentOptions?.onClick}
            />
        );
    });
    return content;
}
