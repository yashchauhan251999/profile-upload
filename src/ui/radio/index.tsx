import React, { useId } from 'react';

interface RadioProps {
    name: string;
    value: string;
    checked: boolean;
    onChange: (value: string) => void;
}

const Radio: React.FC<RadioProps> = ({ name, value, checked, onChange }) => {
    const id = useId();
    return <div className="flex items-center mb-4">
        <input
            id={id}
            type="radio" value={value}
            checked={checked}
            onChange={() => onChange(value)}
            name={name}
            className="w-6 h-6 outline-none accent-blue-800"
        />
    </div>
};

export default Radio;
