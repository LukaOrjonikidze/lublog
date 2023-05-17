import classes from "../Modules/Button.module.css";

const Button = (props) => {
    return (
        <button className={classes['button']} onClick={props.onClick}>{props.children}</button>
    )
}
export default Button;