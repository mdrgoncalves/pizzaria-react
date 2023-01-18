import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styles from './styles.module.scss';

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}
interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>{}

export const Input = ({...rest}: InputProps) => {

    return (
        <input 
            className={styles.input} 
            {...rest}
        />
    )
}

export const TextArea = ({...rest}: TextAreaProps) => {

    return (
        <textarea 
            className={styles.input} 
            {...rest}
        />
    )
}
