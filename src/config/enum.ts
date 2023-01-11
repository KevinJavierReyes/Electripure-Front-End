

export enum INPUT_CONTROL_STATE {
    DEFAULT = -1,
    ERROR = 0,
    OK = 1
}


export enum ORIENTATION_INPUT {
    LEFT = 1,
    RIGHT = 2,
}


export enum NAVEGATION_STATE {
    OPEN = 1,
    CLOSE = 0,
}


export enum TASK_STATE {
    COMPLETED = 1,
    ERROR = -1,
    PENDING = 0,
}

export enum TYPE_SPACE {
    INPUT_DISTANCE = 1,
    INPUT_DISTANCE_VERTICAL = 2,
    TEXT_DISTANCE_VERTICAL = 4,
    FORM_DISTANCE_VERTICAL = 3,
    TEXT_DISTANCE = 5,
    FORM_DISTANCE = 6,
}

export enum VERIFICATION_CHANNEL {
    SMS = 1,
    EMAIL = 2
}

export enum TYPE_DATE_RANGE {
    ONE_MON = 1,
    THREE_MON = 2,
    SIX_MON = 3,
    ONE_YEAR = 4,
    CUSTOM = 5
}

export enum USER_SETTINGS {
    OPEN = 1,
    CLOSE = 0
}
