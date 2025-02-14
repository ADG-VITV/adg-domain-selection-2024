import { Domain, ManagementDomain } from "./types";

export const domainToName: { [key in Domain]: string } = {
  web: "Web",
  ios: "iOS",
  android: "Android",
  ml: "Machine Learning",
  blockchain: "Blockchain",
  design: "Design",
  editorial:"Editorial",
  finance:"Finance",
  events: "Events"
};

export const domainToTaskLink: { [key in Domain]: string } = {
  web: "https://drive.google.com/file/d/12BvVlaVhXH1RSDA4XazcbJUIKWTm61RP/preview",
  ios: "https://drive.google.com/file/d/1Gf4TuzrLt1ydwEnPHyZC1A2OVBi0-664/preview",
  android:
    "https://drive.google.com/file/d/1JmC-8S-qovt8bvrUWdyWckfXGRXLlUof/preview",
  ml: "https://drive.google.com/file/d/1Gaf-5MAhiIYOOamZsv8fq4PSfZnTSpBv/preview",
  blockchain:
    "https://drive.google.com/file/d/1V7Gx7o_3utZLN0u2ZWCH_XWytxRnDie8/preview",
  design:
    "https://drive.google.com/file/d/1UoxCdZHTNUmCmEBiIeFGH00kqJXLN5_L/preview",

    
  editorial:"https://drive.google.com/file/d/12BvVlaVhXH1RSDA4XazcbJUIKWTm61RP/preview",
  finance:"https://drive.google.com/file/d/12BvVlaVhXH1RSDA4XazcbJUIKWTm61RP/preview",
  events: "https://drive.google.com/file/d/12BvVlaVhXH1RSDA4XazcbJUIKWTm61RP/preview"
};

export const managementDomainToTagColorScheme: {
  [key in ManagementDomain]: string;
} = {
  sponsorship: "red",
  publicity: "green",
  general: "blue",
  operations: "yellow",
};
