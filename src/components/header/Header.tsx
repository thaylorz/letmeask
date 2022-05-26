import { ReactNode } from "react";
import './header.scss';

type HeaderProps = {
    children?: ReactNode
};

export function Header(props: HeaderProps) {
    return (
        <header>
            <div className="content">
                {props.children}
            </div>
        </header>
    );
}