import React, { HTMLProps, useEffect, useState, type ReactNode } from "react";

interface InternalQrCodeProps {
    getQrCodeSvg: (content: string) => Promise<
        | {
            status: "ok";
            data: string;
        }
        | {
            status: "error";
            /* eslint-disable  @typescript-eslint/no-explicit-any  -- Too busy right now to generate the necessary types in this upstream package. */
            error: any;
        }
    >;
}

export interface QrCodeProps extends HTMLProps<HTMLDivElement> {
    content: string;
    container: HTMLProps<HTMLDivElement>;
}

export const QrCode = ({
    content,
    getQrCodeSvg,
    ...props
}: QrCodeProps & InternalQrCodeProps): ReactNode => {
    const [data, setData] = useState("");
    const getQrData = async (_content: string): Promise<void> => {
        const res = await getQrCodeSvg(_content);
        if (res.status === "ok") {
            setData(res.data);
        } else {
            console.error("Could not create QR code.");
        }
    };
    useEffect(() => {
        getQrData(content);
        /* eslint-disable-next-line  --  */
    }, [content]);
    return <div {...props} dangerouslySetInnerHTML={{ __html: data }} />;
};

QrCode.displayName = "QrCode";
