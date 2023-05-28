// docs - https://fontawesome.com/v5/docs/web/use-with/react
import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

export default function faIconsSetup() { library.add(fas, far) };