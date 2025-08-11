export interface AutoSetting {
    value: string;
}

export interface AutoTagSetting extends AutoSetting {
    type: "tag";
}

export interface AutoTopicSetting extends AutoSetting {
    type: "topic";
}
export interface AutoSubjectSetting extends AutoSetting {
    type: "subject";
}

export type AnyAutoSetting =
    | AutoTagSetting
    | AutoTopicSetting
    | AutoSubjectSetting;
