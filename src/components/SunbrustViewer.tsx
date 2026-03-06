import { useMainStore } from '@/store/mainStore';
import { SunbrustGraphic } from './ui/sunbrust/SunbrustGraphic';
import { useState, type WheelEventHandler } from 'react';

export interface SunbrustViewerProps {
    className?: string;
}
const [zoomScale, minZoom, maxZoom] = [0.1, 1, 2];

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
                root={current}
                options={{
                    rootRadius: graphRadius * zoomValue,
                    segmentWidth: graphSegmentWidth * zoomValue,
                }}
            ></SunbrustGraphic>
        </div>
    );
}
