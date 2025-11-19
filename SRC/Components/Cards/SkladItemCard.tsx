'use client'

import { Card, CardContent, CardHeader, Typography } from '@mui/material'
import Image from 'next/image'
import React from 'react'

interface SkladItemCardProps {
    title: string
    img: string

    amount: number
}

const SkladItemCard = (props: SkladItemCardProps) => {

    const { amount, img, title } = props;

    return (
        <Card>
            <CardContent>
                <CardHeader title={ title } />
                <Image
                    alt='no image'
                    src={ '/uploads/' + img }
                    width={ 100 }
                    height={ 100 }
                />
                <Typography>
                    Amount: { amount }
                </Typography>
            </CardContent>
        </Card>
    )
}

export default SkladItemCard
