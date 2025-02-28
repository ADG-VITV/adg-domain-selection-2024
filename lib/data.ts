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
  web: "https://drive.google.com/file/d/1D6RC-jpeYapzXOsHEW7fX22KHe5ToAD6/preview",
  ios: "https://drive.google.com/file/d/1SWWdAt9bM8WT6ngBYm7LBuVbIO6WitG6/preview",
  android:
    "https://drive.google.com/file/d/1ktsRf5idRkZ2kOl1IE-j2fb9tEbRRjuc/preview",
  ml: "https://drive.google.com/file/d/1zcDNqCjSqMdzN_WVW8aNKRG9xMWPNAJ8/preview",
  blockchain:
    "https://drive.google.com/file/d/1BFqzbfuYhbL37khra__rI8VjzY995nct/preview",
  design:
    "https://drive.google.com/file/d/1-TrPwnITh0-GLfqA55SMCjnigJeeP4RB/preview",

    
  editorial:"https://drive.google.com/file/d/1dMWWD1tP4NTmlruwA_OKlDP2JJRW4I6E/preview",
  finance:"https://drive.google.com/file/d/1wUtjMgah3WcR_-H3fRGV9x8pKS4favHs/preview",
  events: "https://drive.google.com/file/d/1ps2EO9Qcu2IFG3Z0NW0kcX6732-9D-Ui/preview"
};

export const managementDomainToTagColorScheme: {
  [key in ManagementDomain]: string;
} = {
  sponsorship: "red",
  publicity: "green",
  general: "blue",
  operations: "yellow",
};
