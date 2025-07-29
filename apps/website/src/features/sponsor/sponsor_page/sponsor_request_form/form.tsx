"use client";
import React, { ReactNode, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    businessInterestFormSchema,
    contactPurposes,
    contactTypes,
    ValidatedBusinessInterest,
} from "./formSchema";
import { useForm } from "react-hook-form";
import { Form } from "#/core/shad/ui/form";
import { TextInputGroup } from "#/core/inputs/text_input_group/main";
import { Button, buttonVariants } from "#/core/shad/ui/button";
import { GeneralSelectInput } from "#/core/inputs/general_select";
import { TextAreaInput } from "#/core/inputs/text_area";
import { motion } from "framer-motion";
import { copyStringToClipboard } from "#/core/utils/copy_string_to_clipboard";

const NoStorageModal = ({
    open,
    close,
}: {
    open: boolean;
    close: () => void;
}): ReactNode => {
    return (
        <motion.div
            className="w-screen h-screen fixed top-0 left-0 right-0 bottom-0 flex flex-col justify-center items-center"
            initial="hide"
            animate={open ? "show" : "hide"}
            onClick={close}
            variants={{
                show: {
                    scale: 1,
                    opacity: 1,
                },
                hide: {
                    scale: 0,
                    opacity: 0,
                },
            }}
        >
            <motion.div
                initial="hide"
                animate={open ? "show" : "hide"}
                className="bg-card text-card-foreground w-[min(90vw,640px)] rounded p-4 border space-y-4"
                variants={{
                    show: {
                        scale: 1,
                        opacity: 1,
                    },
                    hide: {
                        scale: 0,
                        opacity: 0,
                    },
                }}
            >
                <div className="text-xl font-semibold">I&apos;m sorry</div>
                <p className="indent-4">
                    I am beyond grateful for your interest in Fluster. Because I&apos;m
                    still homeless, without a valid phone number and without any money I
                    don&apos;t have storage setup to accept your requests in this form
                </p>
                <p className="indent-4">
                    While I&apos;m in this living situation, the best way to contact me is
                    to email me directly at{" "}
                    <a className="text-primary" href="mailto:fluster.eyeoh@gmail.com">
                        fluster.eyeoh@gmail.com
                    </a>
                    . Your message has been copied to your clipboard for convenience.
                </p>
                <p className="indent-4">
                    I apologize and thanks again for your support,
                </p>
                Andrew
                <div className="w-full h-fit flex flex-row justify-end items-center">
                    <a className={buttonVariants()} href="mailto:fluster.eyeoh@gmail.com">
                        Email Me
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
};

const BusinessInterestForm = () => {
    const [open, setOpen] = useState(false);
    const form = useForm({
        resolver: zodResolver(businessInterestFormSchema),
        /* defaultValues: businessContactFormDefaultValues, */
    });
    /* const { toast } = useToast(); */

    const handleSubmit = async (vals: ValidatedBusinessInterest) => {
        setOpen(true);
        copyStringToClipboard(vals.message);
        console.log("vals: ", vals);

        /* let res = await client.contacts.submitBusinessRequest.mutate(vals); */
        /* if (res.contactName) { */
        /*     form.reset(businessContactFormDefaultValues); */
        /*     toast({ */
        /*         title: "Amazing!", */
        /*         description: ( */
        /*             <div> */
        /*                 I'll get back to you as soon as I can. Thank you for supporting Fluster */
        /*             </div> */
        /*         ), */
        /*     }); */
        /* } */
    };

    return (
        <>
            <NoStorageModal open={open} close={() => setOpen(false)} />
            <Form {...form}>
                <form
                    className={"w-full space-y-6"}
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <div className="space-y-6 flex flex-col md:space-y-0 md:flex-row gap-x-4 w-full">
                        <TextInputGroup
                            form={form}
                            label="Company"
                            name="companyName"
                            classes={{
                                formItem: "w-full md:w-1/2",
                            }}
                        />
                        <TextInputGroup
                            form={form}
                            label="Name"
                            name="contactName"
                            classes={{
                                formItem: "w-full md:w-1/2",
                            }}
                        />
                    </div>
                    <TextAreaInput
                        form={form}
                        label="How can I help?"
                        name="message"
                        classes={{
                            formItem: "w-full max-w-full",
                            textArea: "w-full",
                            container: "w-full max-w-full",
                        }}
                    />
                    <div
                        className={"w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6"}
                    >
                        <GeneralSelectInput
                            placeholder="Email"
                            form={form}
                            name="contactPreference"
                            label="Contact Preference"
                            classes={{
                                formItem: "w-full",
                                selectTrigger: "w-full",
                            }}
                            items={contactTypes.map((c) => ({
                                value: c,
                                label: c,
                            }))}
                        />
                        <GeneralSelectInput
                            placeholder="Business"
                            form={form}
                            name="purpose"
                            label="Category"
                            classes={{
                                formItem: "w-full",
                                selectTrigger: "w-full",
                            }}
                            items={contactPurposes.map((c) => ({
                                value: c,
                                label: c,
                            }))}
                        />
                    </div>
                    <div
                        className={"w-full grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-6"}
                    >
                        <TextInputGroup form={form} name="email" label="Email" />
                        <TextInputGroup form={form} name="phone" label="Phone" />
                    </div>
                    <div className={"w-full flex flex-row justify-end items-center"}>
                        <Button className="cursor-pointer" type="submit">
                            Submit
                        </Button>
                    </div>
                </form>
            </Form>
        </>
    );
};

BusinessInterestForm.displayName = "BusinessInterestForm";

export default BusinessInterestForm;
