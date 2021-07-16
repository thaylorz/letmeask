import { ReactNode } from 'react';
import { UserDisplay } from '../userdisplay/UserDisplay';
import './question.scss';

type QuestionProps = {
    content: string,
    author: {
        name: string,
        avatar: string
    },
    isAnswered?: boolean,
    isHighlighted?: boolean,
    children?: ReactNode
};

export function Question({
    content,
    author,
    isAnswered = false,
    isHighlighted = false,
    children
}: QuestionProps) {
    return (
        <div className={`question ${isAnswered ? 'answered' : ''} ${isHighlighted && !isAnswered ? 'highlighted' : ''}`}>
            <p>{content}</p>
            <footer>
                <UserDisplay />
                <div>
                    {children}
                </div>
            </footer>
        </div>
    );
}