import type { SVGAttributes } from 'svelte/elements';

export type IconPaths = { outline: string; solid: string };

export type IconProps = SVGAttributes<SVGSVGElement> & {
	/** Render the solid (filled) variant instead of the outline one. */
	solid?: boolean;
	/** Stroke width of the outline variant. Same as the `stroke-width` attribute. */
	strokeWidth?: number | string;
};
