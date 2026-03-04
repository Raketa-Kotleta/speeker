export default class ColorUtils {
    static getColor(index: number, total: number): string {
        const hue = (index / Math.max(total, 1)) * 360;
        return `hsl(${Math.round(hue)}, 80%, 50%)`;
    }
}
