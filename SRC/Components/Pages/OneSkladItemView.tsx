'use client'
import { getOneSkladItem } from '@/Services/skladService';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import SkladItemCard from '../Cards/SkladItemCard';
import { useSearchParams } from 'next/navigation';

const OneSkladItemView = ({ skladId }: { skladId: string }) => {

    const search = useSearchParams() as { selected?: string }

    const { selected } = search
    const { data, isSuccess } = useQuery({
        queryKey: ['skladItem', selected],
        queryFn: () => getOneSkladItem(+skladId),

    });
    return (
        data && <SkladItemCard
            { ...data }


        >

        </SkladItemCard>
    )
}

export default OneSkladItemView
