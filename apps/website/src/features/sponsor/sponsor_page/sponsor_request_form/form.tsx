"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    businessInterestFormSchema,
    contactPurposes,
    contactTypes,
    ValidatedBusinessInterest,
} from "./formSchema";
import {
    TextInputGroup as TextInput,
    TextAreaInput,
    GeneralSelectInput,
    Button,
    Form,
} from "@fluster.io/dev";
import { useForm } from "react-hook-form";

const BusinessInterestForm = () => {
    const form = useForm({
        resolver: zodResolver(businessInterestFormSchema),
        /* defaultValues: businessContactFormDefaultValues, */
    });
    /* const { toast } = useToast(); */

    const handleSubmit = async (vals: ValidatedBusinessInterest) => {
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
        <Form {...form}>
            <form
                className={"w-full space-y-6"}
                onSubmit={form.handleSubmit(handleSubmit)}
            >
                <div className="space-y-6 flex flex-col md:space-y-0 md:flex-row gap-x-4 w-full">
                    <TextInput
                        form={form}
                        label="Company"
                        name="companyName"
                        classes={{
                            formItem: "w-full md:w-1/2",
                        }}
                    />
                    <TextInput
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
                    <TextInput form={form} name="email" label="Email" />
                    <TextInput form={form} name="phone" label="Phone" />
                </div>
                <div className={"w-full flex flex-row justify-end items-center"}>
                    <Button type="submit">Submit</Button>
                </div>
            </form>
        </Form>
    );
};

BusinessInterestForm.displayName = "BusinessInterestForm";

export default BusinessInterestForm;
