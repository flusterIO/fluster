import { pythonSidecarHelloWorld } from '#/python/data/api_client';
import React, { useEffect, useState, type ReactNode } from 'react'



export const FlusterSidecarHelloWorldPage = (): ReactNode => {
    const [data, setData] = useState<null | string>();
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
