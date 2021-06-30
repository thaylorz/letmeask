import { ButtonHTMLAttributes } from "react";
import '../styles/auth-login-button.scss';

type AuthLoginButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    buttonColor?: "white-button" | "blue-button" | "black-button" | undefined;
    srcImage: string;
    altText: string;
};

export function AuthLoginButton({ buttonColor = "white-button", srcImage, altText, ...props }: AuthLoginButtonProps) {
    return (
        <button className={buttonColor} {...props}>
            <img src={srcImage} alt={altText} />
        </button>
    );
}