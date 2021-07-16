import './list.scss';

type ListProps = {
    style: React.CSSProperties | undefined;
    children?: JSX.Element[];
}

export function List(props: ListProps) {
    return (
        <ul style={props.style}>
            {props.children?.map((child) => {
                return (child)
            })}
        </ul>
    );
}