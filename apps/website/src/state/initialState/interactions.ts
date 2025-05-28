type ModalsState = {
  launchSponsorRequest: boolean;
  contactMe: boolean;
};

export type InitialInteractionsState = {
  modals: ModalsState;
};

export const initialInteractionsState: InitialInteractionsState = {
  modals: {
    launchSponsorRequest: false,
    contactMe: false,
  },
};
