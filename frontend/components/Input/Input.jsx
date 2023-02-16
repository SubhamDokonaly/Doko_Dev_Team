import React from 'react';

export const Input = ({ label, fieldName, labelClass, errors, register, type, inputClass, className }) => {
    return (
        <div className={className}>
            <label
                className={labelClass}
            >
                {label}
            </label>
            <input
                name={fieldName}
                {...register(fieldName)}
                type={type}
                className={inputClass}
                id={fieldName}
            />
            <p className="error">
                {errors[fieldName].message}
            </p>
        </div>
    )
}