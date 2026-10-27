import type { EntryGenerator } from './$types';

import { iconNames } from '../../../site/icons.js';

// one prerendered page per icon; the matcher rejects anything else
export const entries: EntryGenerator = () => iconNames.map((name) => ({ name }));
