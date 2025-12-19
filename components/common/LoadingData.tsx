import { Item, ItemContent, ItemMedia, ItemTitle } from '../ui/item';
import { Spinner } from '../ui/spinner';

interface ILoadingData {
    texto?: string;
}

export const LoadingData = ({ texto = 'Cargando datos...' }: ILoadingData) => {
    return (
        <Item variant={'muted'} className="w-full max-w-sm mx-auto">
            <ItemMedia>
                <Spinner />
            </ItemMedia>
            <ItemContent>
                <ItemTitle className="text-sm font-medium text-muted-foreground animate-pulse">{texto}</ItemTitle>
            </ItemContent>
        </Item>
    );
};
