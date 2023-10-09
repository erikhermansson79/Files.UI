import { useState } from 'react';
import classnames from 'classnames';

export function CheckBox({ isChecked, className, onClick }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <i className={classnames(className, {
            "fa-solid fa-circle-check": isChecked,
            "fa-regular fa-circle-check": !isChecked && isHovering,
            "fa-regular fa-circle": !isChecked && !isHovering
        })}
            onMouseOver={() => setIsHovering(true)}
            onMouseOut={() => setIsHovering(false)}
            onClick={onClick}
        ></i>
    )
}