import { pythonSidecarHelloWorld } from '#/python/data/api_client';
import React, { useEffect, type ReactNode } from 'react'



export const FlusterSidecarHelloWorldPage = (): ReactNode => {
    const getData = async (): Promise<void> => {
        const res = await pythonSidecarHelloWorld();
        console.log("res: ", res)
    }
    useEffect(() => {
        getData()
    }, [])
    return (
        <div>Hello World</div>
    )
}


FlusterSidecarHelloWorldPage.displayName = "FlusterSidecarHelloWorldPage"
