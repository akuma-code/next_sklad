'use client'

import { useQuerySearch } from '@/HOOKS/useQuerySearch'
import { getAllSkladAndInfo } from '@/Services/skladService'
import { Button, ButtonGroup } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export default function SkladItemsList() {

    const { data, isSuccess } = useQuery({
        queryKey: ['sklad_items'],
        queryFn: async () => getAllSkladAndInfo()
    })
    const search = useQuerySearch();
    const router = useRouter()
    const path = usePathname()

    return (
        <ButtonGroup variant='contained' orientation='vertical'>
            {
                isSuccess && data.map(sklad =>
                    <Button key={ sklad.id } onClick={ () => router.push(path + '?' + search("selected", `${sklad.id}`)) }>
                        { sklad.title }
                    </Button>
                )
            }
        </ButtonGroup>
    )
}
