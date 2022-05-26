import './main-container.scss';

type ListProps = {
    children?: JSX.Element | JSX.Element[]
}

export function MainContainer(props: ListProps) {
    return (
        <main className="main-container">
            <div>
                {props.children}
            </div>
        </main>
    );
}