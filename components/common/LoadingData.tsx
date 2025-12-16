import { Item, ItemContent, ItemMedia, ItemTitle } from '../ui/item';
import { Spinner } from '../ui/spinner';

interface ILoadingData {
    texto?: string;
}

export const LoadingData = ({ texto = 'Cargando datos...' }: ILoadingData) => {
    return (
        <Item variant={'muted'}>
            <ItemMedia>
                <Spinner />
            </ItemMedia>
            <ItemContent className="line-clamp-1">
                <ItemTitle>{texto}</ItemTitle>
            </ItemContent>
        </Item>
    );
};
