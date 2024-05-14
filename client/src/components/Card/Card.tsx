'use client';
import React, { useState } from 'react';
import custom from './custom.module.css';
import customscss from './customscss.module.scss';
import clsx from 'clsx';
import { Button } from '../ui/button';

export default function Card() {
    const [expading, setExpading] = useState(false);
    return (
        <div>
            <div
                className={clsx(`${custom.card}`, {
                    [customscss.card__custom]: expading,
                })}
            >
                Card
            </div>
            <Button onClick={() => setExpading(!expading)}>Click Me</Button>
            <h1 className="sans">Hello mọi người</h1>
        </div>
    );
}
