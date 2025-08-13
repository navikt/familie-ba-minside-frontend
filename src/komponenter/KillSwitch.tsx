import { PropsWithChildren } from 'react';
import { erToggleSkruddPå, UnleashToggle } from '@/util/unleash';
import Error from '../app/error';

export function KillSwitch(props: PropsWithChildren) {
    const visFeilside = erToggleSkruddPå(UnleashToggle.DISABLE_MINSIDE);

    if (visFeilside) {
        return <Error />;
    } else {
        return props.children;
    }
}
